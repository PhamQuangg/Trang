import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-voucher',
  templateUrl: './modal-voucher.component.html',
  styleUrls: ['./modal-voucher.component.scss']
})
export class ModalVoucherComponent {

  constructor(
    private fb: FormBuilder,
    private serviceApiService: ServiceApiService,
    public bsModalRef: BsModalRef
  ) {}
  title: string = "Create";
  data: any;
  isNew: boolean = true;
  form = this.fb.group({
    name: [''],
    value: [0], // Default value for voucher
    turn: [1], // Default turn for voucher
    expirationDate: [''] // Default expiration date for voucher
  });
  
  ngOnInit(): void {
    if (this.data != null) {
      this.title = "Edit";
      this.isNew = false;
      this.form.get('name')?.setValue(this.data.name);
      this.form.get('value')?.setValue(this.data.value);
      this.form.get('turn')?.setValue(this.data.turn);
      this.form.get('expirationDate')?.setValue(this.data.expirationDate);
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.serviceApiService.createVoucher(this.form.value).subscribe(res => {
        this.closeModal();
      });
    } else {
      this.serviceApiService.updateVoucher(this.data.id, this.form.value).subscribe(res => {
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
