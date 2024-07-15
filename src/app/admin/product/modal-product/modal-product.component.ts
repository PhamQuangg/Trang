import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartegoryService, ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent {

  constructor(
    private fb: FormBuilder,
    private serviceApiService: ServiceApiService,
    public bsModalRef: BsModalRef,
    private cartegoryService : CartegoryService ,
  ) {}

  title: string = "Create";
  data: any;
  isNew: boolean = true;
  form = this.fb.group({
    name: [''],
    quantity: [''],
    brand: [''],
    description: [''],
    gender: ['1'],
    category: [''],
    size:[""],
    img: [''],
    sale: [0],
    price: [0],
    order: [0]
  });
  listCaterogy:any = [];
  listSize:any =[];
  file:any;
  selectedSizes = [];
  dropdownList:any = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  ngOnInit(): void {
   this.cartegoryService.getList().subscribe((res:any) =>{
      this.serviceApiService.getSizeList().subscribe(res2 => {
        this.listSize = res2 ;
        this.dropdownList = this.listSize.map((s:any) => ({
          id: s.id,
          name: `${s.name} - ${s.gender == '1' ? 'Nam' : 'Nữ'}`
        }));
        this.listCaterogy = res;
        if (this.data != null) {
          this.title = "Edit";
          this.isNew = false;
          this.form.patchValue(this.data);
        }
      })
    })
  
  }

  onSubmit() {
    if (this.isNew) {

      this.serviceApiService.createProduct(this.form.value).subscribe(res => {
        this.closeModal();
      });
    } else {
      this.serviceApiService.updateProduct(this.data.id, this.form.value).subscribe(res => {
        this.closeModal();
      });
    }
  }
  onFileChanged(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.form.get('img')?.setValue(base64String)
    };
    reader.readAsDataURL(file);
  }
  closeModal() {
    this.bsModalRef.hide();
  }

}

