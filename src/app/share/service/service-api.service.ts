import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:3000';

  // Size APIs
  createSize(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/size`, data);
  }

  getSizeList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/size`);
  }

  updateSize(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/size/${id}`, data);
  }

  deleteSize(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/size/${id}`);
  }

  // Product APIs
  createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product`, data);
  }

  getProductList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product`);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${id}`);
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/${id}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product/${id}`);
  }

  // Order APIs
  createOrder(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order`, data);
  }

  getOrderList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order`);
  }

  getOrderById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order/${id}`);
  }
  getOrderByUserId(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order?userId=${id}`);
  }
  updateOrder(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/order/${id}`, data);
  }
  // Size by ID API
  getSizeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/size/${id}`);
  }
  deleteOrder(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/order/${id}`);
  }
  // API for creating a voucher
  createVoucher(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/voucher`, data);
  }

  // API for retrieving a list of vouchers
  getVoucherList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/voucher`);
  }

  // API for updating a voucher by its ID
  updateVoucher(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/voucher/${id}`, data);
  }
  getVoucherByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/voucher?name=${name}`);
  }
  // API for deleting a voucher by its ID
  deleteVoucher(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/voucher/${id}`);
  }
  // Account APIs
  createAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account`, data);
  }

  getAccountList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/account`);
  }

  getAccountById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/${id}`);
  }

  updateAccount(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/account/${id}`, data);
  }

  deleteAccount(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/account/${id}`);
  }
  // Cart APIs
  addToCart(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart`, data);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`);
  }

  updateCartItem(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart/${id}`, data);
  }

  deleteCartItem(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${id}`);
  }
  getCartItemById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/${id}`);
  }
  getCartItemsByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart?userId=${userId}`);
  }
    // Preview APIs
    createPreview(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/preview`, data);
    }
  
    getPreviewList(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/preview`);
    }
  
    getPreviewById(id: any): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/preview/${id}`);
    }
  
    updatePreview(id: any, data: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/preview/${id}`, data);
    }
  
    deletePreview(id: any): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/preview/${id}`);
    }
    getPreviewsByProductId(productId: any): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/preview?productId=${productId}`);
    }
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }
  userName: string = '';
  apiUrl: string = 'http://localhost:3000';
  getAccountByEmail(email: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/account?email=' + email);
  }
  getAccountById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/${id}`);
  }
  checkLogin(role?: number) {
    var token = sessionStorage.getItem('token');
    var roleUser = sessionStorage.getItem('role');
    if (token == null || token == undefined) {
      this._router.navigate(['/login'])
    }
    else {
      if (roleUser != null && role == 0 && parseInt(roleUser) != role) {
        alert("Bạn Không Có Quyền Truy Cập")
        this._router.navigate(['/home'])
      }
    }
  }
  getUserInfor() {
    var user = sessionStorage.getItem('user');
    if (user != null) {
      this.userName = user
      return this.userName
    }
    else {
      return null;
    }

  }
  registerAccount(data: any) {
    console.log(this.apiUrl + 'account', data)
    return this.http.post(this.apiUrl + '/account', data)
  }
  changPass(id: any, data: any) {
    return this.http.put(this.apiUrl + '/account/' + id, data)
  }
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
  setToken() {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwiZW1haWwiOiJuaGF0QGdtYWlsLmNvbSIsIm5iZiI6MTcxNDQ4NDE2NSwiZXhwIjoxNzE1MDg4OTY1LCJpYXQiOjE3MTQ0ODQxNjV9.v-2aKQr8eZaFCnXP_3yUqMXRl1604t323mZnzLz5dGk"
    return token
  }
  sendMail(data: any) {
    return this.http.post<any>('http://servicemail.somee.com/SendMailService/SendMail', data);
  }
}
@Injectable({
  providedIn: 'root'
})
export class CartegoryService {
  apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/category', data);
  }
  getList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/category');
  }
  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/category/' + id, data);
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/category/' + id);
  }

}
