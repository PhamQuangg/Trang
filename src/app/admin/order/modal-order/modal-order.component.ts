import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss']
})
export class ModalOrderComponent {
  constructor(
    private fb: FormBuilder,
    private serviceApiService: ServiceApiService,
    public bsModalRef: BsModalRef
  ) {}

  title: string = "Create";
  data: any;
  isNew: boolean = true;
  form = this.fb.group({
    userId: [''],
    orderDate: [''],
    listProduct: [''],
    sumPrice: [0],
    status: [''],
    phoneNumber: [''],
    address: [''],
  });

  ngOnInit(): void {
    if (this.data != null) {
      this.title = "Edit";
      this.isNew = false;
      console.log(this.data)
      this.form.patchValue(this.data); // Điền dữ liệu từ 'data' vào form

      // Nếu muốn hiển thị các trường khác như productId, sizeId, bạn có thể thực hiện ở đây
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.serviceApiService.createOrder(this.form.value).subscribe(res => {
        this.closeModal();
      });
    } else {
      if(this.data.status != "1" && this.form.value.status == "1"){
        for (let product of this.data.listProductView) {
          this.serviceApiService.getProductById(product.productId).subscribe(res =>{
            res.quantity  = res.quantity - product.amount;
            res.order += product.amount;
            this.serviceApiService.updateProduct(res.id,res).subscribe(res =>{
              
            })
          })
          
        }
      }
      this.serviceApiService.updateOrder(this.data.id, this.form.value).subscribe(res => {
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
