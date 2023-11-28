import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp } from '../_model/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  userSignup(data: SignUp) {
    return this.http.post("http://localhost:8080/signupNew", data);
  }

  checkIfUserExists(data: SignUp){
    return this.http.post("http://localhost:8080/getAccountByEmail", data);
  }

}
