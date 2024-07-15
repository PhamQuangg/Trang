import { Component } from '@angular/core';
import { CartegoryService, ServiceApiService } from 'src/app/share/service/service-api.service';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  modalRef!: BsModalRef;
  listData: any[] = [];
  itemsPerPage: number = 9;
  page: number = 1;
  total: number = 0;

  constructor(
    private modalService: BsModalService,
    private readonly productService: ServiceApiService,
    private cartegoryService : CartegoryService 
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productService.getProductList().subscribe(res => {
      this.listData = res.reverse();
      this.total = this.listData.length;
      this.cartegoryService.getList().subscribe(res => {
        this.listData.forEach((item) =>{
          var obj = res.find(x => x.id == item.category)
          if(obj != null){
            item.categoryName = obj.name
          }
        })
      })
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
    this.modalRef = this.modalService.show(ModalProductComponent, modalOptions);
    this.modalService.onHidden.subscribe(() => {
      this.getData();
    });
  }

  onDelete(id: any) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getData();
    });
  }
  sortProductsByOder(){
    debugger
    this.listData = this.listData.sort((a, b) =>  b.order - a.order );
  }
  pageChangeEvent(page: any) {
    this.page = page;
  }
}
