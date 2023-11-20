import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  LoginResult } from '../_model/login-result.model';
import { Login } from '../_model/login-input.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginOutput: LoginResult = {} as LoginResult;
  incorrectCredentials : boolean = false;
  ngOnInit(): void {

  }

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  login(data: Login): void {
    this.loginService.userLogin(data).subscribe((result) => {

      this.loginOutput = result as LoginResult;

      if(this.loginOutput.data !== -1){
        console.warn(this.loginOutput);
        localStorage.setItem("user", JSON.stringify(this.loginOutput.data));
        this.router.navigate([""]);
      }

      else{
        this.incorrectCredentials = true;
      }

    });
  }

}
