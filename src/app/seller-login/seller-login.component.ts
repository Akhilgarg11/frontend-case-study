import { Component, OnInit } from '@angular/core';
import { LoginResult } from '../_model/login-result.model';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { Login } from '../_model/login-input.model';
import { SellerLoginService } from '../_services/seller-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {
  isSellerLoggedin: boolean = false;
  loginOutput: LoginResult = {} as LoginResult;
  incorrectCredentials: boolean = false;
  loginForm: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    if (localStorage.getItem('seller')) this.router.navigate(['/seller']);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  constructor(private loginService: SellerLoginService, private router: Router, private fb: FormBuilder) { }

  login(data: Login): void {
    this.loginService.sellerLogin(data).subscribe((result) => {

      this.loginOutput = result as LoginResult;

      if (this.loginOutput.data !== -1) {
        window.alert("seller logged in successfully!");
        console.warn(this.loginOutput);
        localStorage.setItem("seller", JSON.stringify(this.loginOutput.data));
        this.isSellerLoggedin = true;
        this.router.navigate(["seller"]);

      }

      else {
        this.incorrectCredentials = true;
      }

    });
  }
}
