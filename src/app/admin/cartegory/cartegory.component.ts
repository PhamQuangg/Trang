import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { CartegoryService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-cartegory',
  templateUrl: './cartegory.component.html',
  styleUrls: ['./cartegory.component.scss']
})
export class CartegoryComponent {

  constructor(
    private modalService: BsModalService,
    private readonly categoryService : CartegoryService
  ) {}
  modalRef!: BsModalRef;
  listData:any[] = []
  itemsPerPage:number = 9;
  page:number=1;
  total:number=0;

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.categoryService.getList().subscribe(res => {
      this.listData = res ;
      this.total = this.listData.length;
    })
  }
  openModal(item?:any) {
    var data ;
    (item != undefined && item != null )? data = item : data = null;
    const initialState = {
       data: data
    };
    const modalOptions: ModalOptions = {
      initialState,
      class: 'modal-dialog-centered modal-lg' // Thêm class để modal nằm chính giữa
    };
    this.modalRef = this.modalService.show(ModalCategoryComponent,modalOptions);
    this.modalService.onHidden.subscribe(res =>{
      this.getData()
    })
  }
  onDelete(id:any){
    this.categoryService.deleteCategory(id).subscribe(res =>{
      this.getData()
    })
  }
  pageChangeEvent(page:any){
    this.page = page;
  }
}
