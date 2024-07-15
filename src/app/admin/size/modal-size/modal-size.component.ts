import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartegoryService, ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-size',
  templateUrl: './modal-size.component.html',
  styleUrls: ['./modal-size.component.scss']
})
export class ModalSizeComponent {


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
    gender: [1],
    decriptions: ['']
  });
  
  ngOnInit(): void {
    if (this.data != null) {
      this.title = "Edit";
      this.isNew = false;
      this.form.get('name')?.setValue(this.data.name);
      this.form.get('decriptions')?.setValue(this.data.decriptions);
  
      // Kiểm tra nếu thuộc tính 'gender' tồn tại trong data
      if ('gender' in this.data) {
        this.form.get('gender')?.setValue(this.data.gender);
      }
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.serviceApiService.createSize(this.form.value).subscribe(res => {
        this.closeModal();
      });
    } else {
      this.serviceApiService.updateSize(this.data.id, this.form.value).subscribe(res => {
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
