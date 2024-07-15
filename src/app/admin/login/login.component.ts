import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private readonly _accountService: AccountService,
  ) {}
  checkForm : number = 0; //loginForm  1 //registerForm
  otpReset:number = 0;
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });
  registerForm = this.fb.group({
    id:[0],
    firtsName:[''],
    lastName:[''],
    email: [''],
    password: [''],
    role: 1,
  });
  forgotForm = this.fb.group({
    email:[''],
    otp:[0]
  });
  changerPassForm = this.fb.group({
    password:[''],
    passwordConfirm:[''],
  });
  ngOnInit(): void {
      
  }

  login(){
    if(this.loginForm.value.email){
      this._accountService.getAccountByEmail(this.loginForm.value.email).subscribe((res:any)=>{
       if(res[0] != null && this.loginForm.value.password == res[0].password){          
          this.setToken(res[0])
       }
       else{
        alert("Sai Tài Khoản Hoặc Mật Khẩu")
       }
      })
    }

  }
  register(){
    var data = {
      "userName":this.registerForm.value.firtsName + ' ' + this.registerForm.value.lastName ,
      "email":this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "role": this.registerForm.value.role  
    }
    if(data.email != null){
      this._accountService.getAccountByEmail(data.email).subscribe((res:any) =>{
        if(res[0] != null){
          alert("Tài Khoản Đã Tồn Tại")
        }
        else{
          this._accountService.registerAccount(data).subscribe((res:any) =>{
              alert("Tạo Tài Khoản Thành Công")
              this.checkForm = 0;
          })
        }
      })
    }
  }
  setToken(userInfor:any){
    var token = this._accountService.setToken();
    sessionStorage.setItem('token',token)
    sessionStorage.setItem('user',userInfor.userName)
    sessionStorage.setItem('userId',userInfor.id)
    sessionStorage.setItem('role',userInfor.role)
    if(userInfor.role == 0){
      this._router.navigate(['/admin'])
    }
    else{
      this._router.navigate(['/home'])
    }
  }
  sendMail(){
    
    if(this.forgotForm.value.email != null){
      this._accountService.getAccountByEmail(this.forgotForm.value.email).subscribe((res:any) =>{
        if(res[0] != null){
          var code = "";
          for (let i = 0; i < 6; i += 1) {
            code += (Math.floor(Math.random() * (10 - 0)).toString())
          }
          this.otpReset = parseInt(code);
          var data = {
            "email": this.forgotForm.value.email,
            "teamplate": "Mã Xác Nhận Của Bạn Là" + " " + code
          }
          console.log(this.otpReset)
          this._accountService.sendMail(data).subscribe(res =>{
            if(res.status == 1){
              alert("Mã Đã Được Gửi")
    
            }
          })
        }
        else{
         alert("Tài Khoản Không Tồn Tại")
        }
      })

    }
  }
  checkOTP(){
    if(this.forgotForm.value.otp == this.otpReset){
      this.checkForm  = 3;
    }
    else{
      alert("sai mã xác nhận")
    }
  }
  changerPass(){
    if(this.changerPassForm.value.password == this.changerPassForm.value.passwordConfirm && this.forgotForm.value.email != null){  
      this._accountService.getAccountByEmail(this.forgotForm.value.email).subscribe(res => {
        if(res[0] != null) {
          res[0].password = this.changerPassForm.value.password ;
          var data = {
            "userName":res[0].userName,
            "email":res[0].email,
            "password": this.changerPassForm.value.password,
            "role": res[0].role
          }
          console.log(data)
          this._accountService.changPass(res[0].id,data).subscribe(res =>{
            this.checkForm = 0;
          })
        }
      })
    }
  }
}
