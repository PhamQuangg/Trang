import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CartegoryService, ServiceApiService } from 'src/app/share/service/service-api.service';
import { ModalSizeComponent } from './modal-size/modal-size.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent {

  constructor(
    private modalService: BsModalService,
    private readonly _serviceApi : ServiceApiService
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
    this._serviceApi.getSizeList().subscribe(res => {
      this.listData = res;
      this.total = this.listData.length;
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
    this.modalRef = this.modalService.show(ModalSizeComponent, modalOptions);
    this.modalService.onHidden.subscribe(() => {
      this.getData();
    });
  }

  onDelete(id: any) {
    this._serviceApi.deleteSize(id).subscribe(() => {
      this.getData();
    });
  }

  pageChangeEvent(page: any) {
    this.page = page;
  }
}
