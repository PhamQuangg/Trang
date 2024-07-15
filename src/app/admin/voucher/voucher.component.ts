import { Component } from '@angular/core';
import { ModalVoucherComponent } from './modal-voucher/modal-voucher.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent {
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
    this._serviceApi.getVoucherList().subscribe(res => {
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
    this.modalRef = this.modalService.show(ModalVoucherComponent, modalOptions);
    this.modalService.onHidden.subscribe(() => {
      this.getData();
    });
  }

  onDelete(id: any) {
    this._serviceApi.deleteVoucher(id).subscribe(() => {
      this.getData();
    });
  }

  pageChangeEvent(page: any) {
    this.page = page;
  }
}
