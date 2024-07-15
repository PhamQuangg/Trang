import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.scss']
})
export class ModalAccountComponent {

  constructor(
    private fb: FormBuilder,
    private serviceApiService: ServiceApiService,
    public bsModalRef: BsModalRef
  ) {}
  
  title: string = "Create";
  data: any;
  isNew: boolean = true;
  form = this.fb.group({
    userName: [''],
    email: [''],
    password: [''],
    role: [1]
  });
  
  ngOnInit(): void {
    if (this.data != null) {
      this.title = "Edit";
      this.isNew = false;
      this.form.patchValue(this.data);
    }
  }
  
  
  onSubmit() {
    if (this.isNew) {
      this.serviceApiService.createAccount(this.form.value).subscribe(res => {
        this.closeModal();
      });
    } else {
      this.serviceApiService.updateAccount(this.data.id, this.form.value).subscribe(res => {
        this.closeModal();
      });
    }
  }
  
  closeModal() {
    this.bsModalRef.hide();
  }
}
