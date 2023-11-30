import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResult } from '../_model/login-result.model';
import { Login } from '../_model/login-input.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isUserLoggedin: boolean = false;
  loginOutput: LoginResult = {} as LoginResult;
  incorrectCredentials: boolean = false;
  loginForm: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    if (localStorage.getItem('user')) this.router.navigate(['']);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  login(data: Login): void {
    this.loginService.userLogin(data).subscribe((result) => {

      this.loginOutput = result as LoginResult;

      if (this.loginOutput.data !== -1) {
        window.alert("user logged in successfully!");
        console.warn(this.loginOutput);
        localStorage.setItem("user", JSON.stringify(this.loginOutput.data));
        this.isUserLoggedin = true;
        this.router.navigate([""]);
      }

      else {
        this.incorrectCredentials = true;
      }

    });
  }

}
