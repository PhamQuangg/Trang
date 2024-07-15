import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, ServiceApiService } from '../service/service-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private readonly _accountService: AccountService,
    private readonly _cart: ServiceApiService 
  ) {}
  user:any = null;
  cartCount:any = 0;
  userRole:any = null;
  userScore:number = 0;
  ngOnInit(): void {
     this.user =  this._accountService.getUserInfor();
     var userId = sessionStorage.getItem('userId');
     this.userRole = sessionStorage.getItem('role');
     this._cart.getAccountById(userId).subscribe((res:any) => {
      this.userScore = res.score
      console.log(this.userScore)
     })
    this.onLoadCartCount()
    
  }
  onLoadCartCount(){
    var userId = sessionStorage.getItem('userId')
    if(userId){
     this._cart. getCartItemsByUserId(userId).subscribe(res =>{
       this.cartCount = res.length
      })
    }
  }
  logout(){
    this._accountService.logout();
  }
}
