import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private readonly _accountService: AccountService,
  ) {}

  checkPage:number = 7;
  ngOnInit(): void {
      this._accountService.checkLogin(0);
  }
  logOut(){
    sessionStorage.clear();
    this._router.navigate(['login'])
  }
}
