import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import {  LoginResult } from '../_model/login-result.model';
import { Login } from '../_model/login-input.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginOutput: LoginResult = {} as LoginResult;

  ngOnInit(): void {

  }

  constructor(private loginService: LoginService, private router: Router) { }

  login(data: Login): void {
    this.loginService.userLogin(data).subscribe((result) => {

      this.loginOutput = result as LoginResult;

      if(this.loginOutput.data){
        this.router.navigate([""]);
      }

    });
  }

}
