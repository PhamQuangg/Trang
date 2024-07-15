import { Component } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DetailOderComponent } from 'src/app/admin/order/detail-oder/detail-oder.component';
import { ModalOrderComponent } from 'src/app/admin/order/modal-order/modal-order.component';
import { ServiceApiService, AccountService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-myoder',
  templateUrl: './myoder.component.html',
  styleUrls: ['./myoder.component.scss']
})
export class MyoderComponent {
  constructor(
    private modalService: BsModalService,
    private readonly _serviceApi : ServiceApiService,
    private readonly _accountSevice: AccountService ,
  ) {}
  
  modalRef!: BsModalRef;
  listData:any[] = []
  itemsPerPage:number = 9;
  page:number=1;
  total:number=0;

  ngOnInit() {
    this.getData();
  }

 
  getData() {
    var userId = sessionStorage.getItem('userId')
    this._serviceApi.getOrderByUserId(userId).subscribe(res => {   
      this.listData = [];
      this.total = res.length;
      res.forEach((order:any) => {
        const orderData = {
          id: order.id,
          userId: order.userId,
          orderDate: order.orderDate,
          listProduct: order.listProduct,
          sumPrice: order.sumPrice,
          userInfor:{},
          status:order.status,
          listProductView: [],
          phoneNumber: order.phoneNumber,
          address: order.address
        };
        this._accountSevice.getAccountById(order.userId).subscribe(res =>{
          var user = res;
          orderData.userInfor = user ;
          const listProduct = JSON.parse(order.listProduct);
          listProduct.forEach((i:any) => {
            this._serviceApi.getProductById(i.productId).subscribe(product => {
              this._serviceApi.getSizeById(i.sizeId).subscribe(size => {
                orderData.listProductView = listProduct.map((item :any) => ({
                  productId: item.productId,
                  sizeId: item.sizeId,
                  productName: product.name, // Giả sử product có thuộc tính name
                  productPrice: product.price, // Giả sử product có thuộc tính price
                  sizeName : size.name,
                  amount : i.amount,
                  price:i.price,
                  preview:item.preview,
                  userId:order.userId
                }))
               
              });
            });
         
          })        
        })
        this.listData.push(orderData);
      });
    });
  }
  openDetailModal(item?: any){
      const data = (item !== undefined && item !== null) ? item : null;
      const initialState = {
         data: data
      };
      const modalOptions: ModalOptions = {
        initialState,
        class: 'modal-dialog-centered modal-lg'
      };
      this.modalRef = this.modalService.show(DetailOderComponent, modalOptions);
      this.modalService.onHidden.subscribe(() => {
        this.getData();
      });

  }
}
