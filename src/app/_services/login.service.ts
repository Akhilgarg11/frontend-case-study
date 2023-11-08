import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  LoginResult } from '../_model/login-result.model';
import { Observable } from 'rxjs';
import { Login } from '../_model/login-input.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  userLogin(data: Login): Observable<LoginResult> {
    return this.http.post<LoginResult>("http://localhost:8080/login", data);
  }
}
