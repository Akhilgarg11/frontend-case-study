import { Component, OnInit } from '@angular/core';
import { LoginResult } from '../_model/login-result.model';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { Login } from '../_model/login-input.model';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit{
  loginOutput: LoginResult = {} as LoginResult;
  incorrectCredentials : boolean = false;
  ngOnInit(): void {

  }

  constructor(private loginService: LoginService, private router: Router) { }

  login(data: Login): void {
    this.loginService.userLogin(data).subscribe((result) => {

      this.loginOutput = result as LoginResult;

      if(this.loginOutput.data !== -1){
        console.warn(this.loginOutput);
        localStorage.setItem("seller", JSON.stringify(this.loginOutput.data));
        this.router.navigate(["seller"]);

      }

      else{
        this.incorrectCredentials = true;
      }

    });
  }
}
