import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './web-view/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductViewComponent } from './web-view/product-view/product-view.component';
import { ProductDetailComponent } from './web-view/product-detail/product-detail.component';
import { CartComponent } from './web-view/cart/cart.component';
import { MyoderComponent } from './web-view/myoder/myoder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: DashboardComponent},
  { path: 'product', component: ProductViewComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'cart', component: CartComponent},
  { path: 'myorder', component: MyoderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
