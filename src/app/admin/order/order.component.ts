import { Component } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AccountService, ServiceApiService } from 'src/app/share/service/service-api.service';
import { ModalOrderComponent } from './modal-order/modal-order.component';
import { DetailOderComponent } from './detail-oder/detail-oder.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
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
    this._serviceApi.getOrderList().subscribe(res => {   
      this.listData = [];
      this.total = res.length;
      res.forEach(order => {
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
                  price:i.price
                }))
               
              });
            });
         
          })        
        })
        this.listData.push(orderData);
      });
    });
  }
  openModal(item?: any) {
    const data = (item !== undefined && item !== null) ? item : null;
    const initialState = {
       data: data
    };
    const modalOptions: ModalOptions = {
      initialState,
      class: 'modal-dialog-centered modal-lg'
    };
    this.modalRef = this.modalService.show(ModalOrderComponent, modalOptions);
    this.modalService.onHidden.subscribe(() => {
      this.getData();
    });
  }

  onDelete(id: any) {
    this._serviceApi.deleteOrder(id).subscribe(() => {
      this.getData();
    });
  }
  openDetailModal(item?: any){
    console.log(item)
    const data = (item !== undefined && item !== null) ? item : null;
    const initialState = {
       data: data
    };
    const modalOptions: ModalOptions = {
      initialState,
      class: 'modal-dialog-centered modal-lg'
    };
    this.modalRef = this.modalService.show(DetailOderComponent, modalOptions);

  }
  pageChangeEvent(page: any) {
    this.page = page;
  }
}
