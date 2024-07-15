import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartegoryService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent {

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private readonly categoryService : CartegoryService
  ) {}
  form = this.fb.group({
    name:['',Validators.required],
    decriptions:['']
  });
  title:string ="Create"
  data: any;
  isNew:boolean = true;
  ngOnInit(): void {
    console.log(this.data); // In dữ liệu đã được truyền vào từ modal
    if(this.data != null){
      this.title = "Edit"
      this.isNew = false
     this.form.get('name')?.setValue(this.data.name)
     this.form.get('decriptions')?.setValue(this.data.decriptions)
    }
  }
  onSubmit(){
    if(this.isNew){
      this.categoryService.createCategory(this.form.value).subscribe(res =>{
        this.closeModal();
      })
    }
    else{
      this.categoryService.updateCategory(this.data.id,this.form.value).subscribe(res =>{
        this.closeModal();
      })
    }
  }
  
  closeModal(){
    this.bsModalRef.hide()
  }
}
