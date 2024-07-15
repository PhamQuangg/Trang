import { Component } from '@angular/core';
import { ModalAccountComponent } from './modal-account/modal-account.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(
    private modalService: BsModalService,
    private readonly _serviceApi: ServiceApiService
  ) {}
  
  modalRef!: BsModalRef;
  listData: any[] = [];
  itemsPerPage: number = 9;
  page: number = 1;
  total: number = 0;
  
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this._serviceApi.getAccountList().subscribe(res => {
      this.listData = res.filter(x => x.role != 0);
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
    this.modalRef = this.modalService.show(ModalAccountComponent, modalOptions);
    this.modalService.onHidden.subscribe(() => {
      this.getData();
    });
  }
  
  onDelete(id: any) {
    this._serviceApi.deleteAccount(id).subscribe(() => {
      this.getData();
    });
  }
  
  pageChangeEvent(page: any) {
    this.page = page;
  }
}
