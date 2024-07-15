import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { HomeComponent } from './web-view/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartegoryComponent } from './admin/cartegory/cartegory.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalCategoryComponent } from './admin/cartegory/modal-category/modal-category.component';
import { SizeComponent } from './admin/size/size.component';
import { ModalSizeComponent } from './admin/size/modal-size/modal-size.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './admin/product/product.component';
import { ModalProductComponent } from './admin/product/modal-product/modal-product.component';
import { ProductViewComponent } from './web-view/product-view/product-view.component';
import { VoucherComponent } from './admin/voucher/voucher.component';
import { ModalVoucherComponent } from './admin/voucher/modal-voucher/modal-voucher.component';
import { OrderComponent } from './admin/order/order.component';
import { ModalOrderComponent } from './admin/order/modal-order/modal-order.component';
import { ProductDetailComponent } from './web-view/product-detail/product-detail.component';
import { AccountComponent } from './admin/account/account.component';
import { ModalAccountComponent } from './admin/account/modal-account/modal-account.component';
import { CartComponent } from './web-view/cart/cart.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DetailOderComponent } from './admin/order/detail-oder/detail-oder.component';
import { MyoderComponent } from './web-view/myoder/myoder.component';
import { ChartComponent } from './admin/chart/chart.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    CartegoryComponent,
    ModalCategoryComponent,
    SizeComponent,
    ModalSizeComponent,
    ProductComponent,
    ModalProductComponent,
    ProductViewComponent,
    VoucherComponent,
    ModalVoucherComponent,
    OrderComponent,
    ModalOrderComponent,
    ProductDetailComponent,
    AccountComponent,
    ModalAccountComponent,
    CartComponent,
    DetailOderComponent,
    MyoderComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
