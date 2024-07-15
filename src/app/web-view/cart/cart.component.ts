import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, forkJoin } from 'rxjs';
import { AccountService, CartegoryService, ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private readonly _accountService: AccountService,
    private readonly _cart: ServiceApiService,
    private readonly _service: ServiceApiService,
    private readonly cartegoryService: CartegoryService
  ) { }
  user: any = null;
  userInfor:any;
  listCart: any[] = [];
  subtotal: any = 0;
  checkOut: boolean = false;
  listProductOrderByUser :any [] = [];
  voucherCode: string = ""
  statusVoucher = "";
  userScore:number = 0;
  orderForm = this.fb.group({
    userId: [''],
    orderDate: [''],
    listProduct: [''],
    sumPrice: [0],
    phoneNumber: ['',Validators.required],
    address: [''],
    status: ['0'],
  });
  ngOnInit(): void {
    this.user = this._accountService.getUserInfor();
    var userId = sessionStorage.getItem('userId');
    this._cart.getAccountById(userId).subscribe((res:any) => {
      this.userInfor = res;
      this.userScore = res.score;
     })
    this.getListCart()

  }
  useScore(){
    this.subtotal = this.subtotal - this.userScore
    this.userScore = 0;
  }
  getListCart() {
    var list: any[] = [];
    this.subtotal = 0
    var userId = sessionStorage.getItem('userId')
    if (userId) {
      this.orderForm.get('userId')?.setValue(userId)
      this._cart.getCartItemsByUserId(userId).subscribe(res => { 
        res.forEach((item: any) => {
          var newItem: any = {
            "id": item.id,
            "userId": item.userId,
            "productId": item.productId,
            "sizeId": item.sizeId,
            "price": item.price,
            "amount": item.amount,
            "size": null,
            "product": null,
            "categoryName": null
          }
          this.listProductOrderByUser.push({productId: item.productId ,sizeId: item.sizeId , amount: item.amount , price: item.price ,preview:0})
          this.subtotal += item.price
          this._service.getProductById(item.productId).subscribe(res => {
            newItem.product = res
            this.cartegoryService.getList().subscribe(res => {
              var obj = res.find(x => x.id == newItem.product.category)
              if (obj != null) {
                if (newItem.product) {
                  newItem.categoryName = obj.name
                }
              }
              this._service.getSizeById(item.sizeId).subscribe(res => {
                newItem.size = res
                list.push(newItem)
              })
            })
          })


        })
        this.listCart = list;
      })
    }
  }
  plusItem(item: any) {
    var newItem: any = {
      "userId": item.userId,
      "productId": item.productId,
      "sizeId": item.sizeId,
      "price": item.price,
      "amount": item.amount,
    }
    newItem.amount += 1;
    newItem.price = (item.product.price - ((item.product.price * item.product.sale) / 100)) * newItem.amount;
    this._service.updateCartItem(item.id, newItem).subscribe(res => {
      this.getListCart()
    })
  }
  minusItem(item: any) {
    var newItem: any = {
      "userId": item.userId,
      "productId": item.productId,
      "sizeId": item.sizeId,
      "price": item.price,
      "amount": item.amount,
    }
    if (newItem.amount > 1) {
      newItem.amount -= 1
    }
    else {
      return;
    }
    newItem.price = (item.product.price - ((item.product.price * item.product.sale) / 100)) * newItem.amount;
    this._service.updateCartItem(item.id, newItem).subscribe(res => {
      this.getListCart()
    })
  }
  remove(item: any) {
    this._service.deleteCartItem(item.id).subscribe(res => {
      this.getListCart();
      window.location.reload();
      setTimeout(() => {

      }, 200)

    })
  }
  checkVoucher(event: any) {

  }
  useVoucher() {
   this.applyVoucher(this.subtotal, this.voucherCode)
    console.log(this.subtotal )
  }

  applyVoucher(subtotal: number, voucherName: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._cart.getVoucherByName(voucherName).subscribe(
        (res: any) => {
          // Kiểm tra nếu voucher không tồn tại
          var voucher = res[0];
          if (!voucher) {
            this.statusVoucher = "Voucher Không Tồn Tại"
            resolve(subtotal); // Trả về subtotal ban đầu nếu voucher không tồn tại
          } else {
            // Kiểm tra lượt dùng
            if (voucher.turn <= 0) {
              this.statusVoucher = "Voucher Hết Lượt Dùng"
              resolve(subtotal); // Trả về subtotal ban đầu nếu lượt dùng đã hết
            }
            // Kiểm tra ngày hết hạn
            const expirationDate = new Date(voucher.expirationDate);
            const currentDate = new Date();
            if (expirationDate < currentDate) {
              this.statusVoucher = "Voucher Hết Hạn"
              resolve(subtotal); // Trả về subtotal ban đầu nếu voucher đã hết hạn
            }
            else {
              // Nếu voucher hợp lệ, tính toán giảm giá từ giá trị của voucher
              this.statusVoucher = "Voucher Áp Dụng Thành Công"
              const discount = (this.subtotal * voucher.value) / 100;
              this.subtotal = (this.subtotal -  ((this.subtotal * voucher.value)/ 100));
              resolve(discount);
            }

          }
        },
      );
    });
  }
  onSubmit() {
    var date = formatDate(new Date(),'yyyy-MM-dd','en-us')
    this.orderForm.get('sumPrice')?.setValue(this.subtotal)
    this.orderForm.get('orderDate')?.setValue(date)
    var listProduct = JSON.stringify(this.listProductOrderByUser)
    this.orderForm.get('listProduct')?.setValue(listProduct)
  
    this._cart.createOrder(this.orderForm.value).pipe(
      switchMap(orderResponse => {
        return this._cart.getCartItemsByUserId(this.orderForm.value.userId);
      }),
      switchMap(cartItems => {
        const deleteRequests = cartItems.map(item => this._cart.deleteCartItem(item.id));
        return forkJoin(deleteRequests);
      }),
      switchMap(resutl => {
        this.userInfor.score = this.userScore;
        return this._cart.updateAccount(this.userInfor.id,this.userInfor)
      })
    ).subscribe({
      next: () => {
        alert("cảm ơn bạn đã đặt hàng");
        this._router.navigate(['home']);
      },
      error: (error) => {
        console.error(error);
        // Xử lý lỗi
      }
    });
  }
}
