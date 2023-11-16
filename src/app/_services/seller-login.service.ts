import { Injectable } from '@angular/core';
import { Login } from '../_model/login-input.model';
import { Observable } from 'rxjs';
import { LoginResult } from '../_model/login-result.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerLoginService {

  constructor(private http:HttpClient) { }

  sellerLogin(data: Login): Observable<LoginResult> {
    return this.http.post<LoginResult>("http://localhost:8080/seller/login", data);
  }

}
