import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../_model/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SellerSignupServiceService {

  constructor(private http:HttpClient) { }
  sellerSignup(data: SignUp){
    return this.http.post("http://localhost:8080/seller/signup", data);
  }
}
