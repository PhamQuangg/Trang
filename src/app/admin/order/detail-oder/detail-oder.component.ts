import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-detail-oder',
  templateUrl: './detail-oder.component.html',
  styleUrls: ['./detail-oder.component.scss']
})
export class DetailOderComponent {

  constructor(
    private fb: FormBuilder,
    private apiService: ServiceApiService,
    public bsModalRef: BsModalRef
  ) { }
  data: any;
  listData: any[] = [];
  scorePlus:any = 5000;
  form = this.fb.group({
    userId: [''],
    productId: [],
    decriptions: ['']
  });
  userRole:any;
  ngOnInit(){
    this.listData = this.data.listProductView;
    this.userRole = sessionStorage.getItem('role');
  }
  setFormValue(item: any) {
    this.form.patchValue(item)
  }
  onSubmit(): void {
    const formData = this.form.value;
    // Step 1: Create a preview entry
    this.apiService.createPreview(formData).subscribe(
      previewResponse => {

        // Step 2: Update the user's score
        const userId = formData.userId;
        this.apiService.getAccountById(userId).subscribe(
          user => {
            user.score += this.scorePlus;
            this.apiService.updateAccount(userId, user).subscribe(
              userResponse => {
                // Step 3: Update the order's preview field
                this.apiService.getOrderByUserId(userId).subscribe(
                  orders => {
                    let orderToUpdate: any = null;

                    orders.forEach((order:any) => {
                      const listProduct = JSON.parse(order.listProduct);
                      listProduct.forEach((product: any) => {
                        if (product.productId === formData.productId) {
                          product.preview = 1;
                          orderToUpdate = order;
                        }
                      });

                      if (orderToUpdate) {
                        orderToUpdate.listProduct = JSON.stringify(listProduct);
                      }
                    });

                    if (orderToUpdate) {
                      this.apiService.updateOrder(orderToUpdate.id, orderToUpdate).subscribe(
                        orderResponse => {
                          console.log('Order updated:', orderResponse);
                        },
                        error => {
                          console.error('Error updating order:', error);
                        }
                      );
                    }
                  },
                  error => {
                    console.error('Error fetching orders:', error);
                  }
                );
              },
              error => {
                console.error('Error updating user score:', error);
              }
            );
          },
          error => {
            console.error('Error fetching user:', error);
          }
        );
      },
      error => {
        console.error('Error creating preview:', error);
      }
     
    );
    this.bsModalRef.hide();
  }
}