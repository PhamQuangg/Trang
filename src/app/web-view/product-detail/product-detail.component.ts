import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountComponent } from 'src/app/admin/account/account.component';
import { ServiceApiService, CartegoryService, AccountService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  constructor(
    private _router: ActivatedRoute,
    private readonly productService: ServiceApiService,
    private readonly _cart: ServiceApiService,
    private cartegoryService : CartegoryService ,
    private _accountService :AccountService
  ) {}
  productId:any = null;
  product:any = null;
  sizeId:string = "";
  user:any = null;
  previews:any = [];
  userRole :any = "";
  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.user = this._accountService.getUserInfor();
    this.productId = this._router.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(res =>{
      this.product = res;
      this.cartegoryService.getList().subscribe(res => {
        var obj = res.find(x => x.id == this.product.category)
        if(obj != null){
          this.product.categoryName = obj.name
        }
      })
    })
    this.loadPreviews()
  }
  loadPreviews(): void {
    this.productService.getPreviewsByProductId(this.productId).subscribe(res => {
      console.log(res);
      res.forEach((e:any) => {
        this.productService.getAccountById(e.userId).subscribe(res =>{
          e.user = res
        })
      });
      this.previews = res;
      console.log(this.previews)
    });

  }
  addCart(product:any){
    if(this.sizeId != null && this.sizeId != ""){
      var cartItemPrice = (product.price - ((product.price * product.sale)/100))
      var cartItem = {
        "userId": sessionStorage.getItem('userId'),
        "productId":product.id,
        "sizeId":this.sizeId,
        "price":cartItemPrice,
        "amount":1
      }
      this._cart.getCartItemsByUserId(cartItem.userId).subscribe(
        (cartItems: any[]) => {
          const exist = cartItems.some(item => item.productId === cartItem.productId && item.sizeId === cartItem.sizeId);
          if (!exist) {
            // Nếu mục chưa tồn tại, thực hiện gọi API để tạo giỏ hàng
            this._cart.addToCart(cartItem).subscribe(
              (response: any) => {
                console.log("Đã thêm mục vào giỏ hàng:", response);
                window.location.reload();
                
              },
              (error: any) => {
                console.error("Lỗi khi thêm mục vào giỏ hàng:", error);
              }
            );
          } else {
            console.log("Mục đã tồn tại trong giỏ hàng, không thêm mới.");
          }
        },
        (error: any) => {
          console.error("Lỗi khi kiểm tra giỏ hàng:", error);
        }
      );
    }
    else{
      alert("Vui lòng chọn size")
      return
    }
  }
  selectSize(size:any){
    this.sizeId = size;
  }
  removePreview(id:any){
    this.productService.deletePreview(id).subscribe(res =>{
      this.loadPreviews()
    })
  }
}
