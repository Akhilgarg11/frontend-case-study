import { Component, OnInit } from '@angular/core';
import { SignupService } from '../_services/signup.service';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';
import { LoginResult } from '../_model/login-result.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  isUserLoggedin: boolean = false;
  isUserEmailAlreadyExists: boolean = false;
  loginOutput: LoginResult = {} as LoginResult;
  signupForm: FormGroup = {} as FormGroup;

  constructor(private signupService: SignupService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) this.router.navigate(['']);
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signup(data: SignUp): void {

    this.signupService.checkIfUserExists(data).subscribe(
      (resp: any) => {
        console.warn(resp);
        this.isUserEmailAlreadyExists = resp;
      }
    )

    if (!this.isUserEmailAlreadyExists) {
      this.signupService.userSignup(data).subscribe(
        (result: any) => {
          window.alert("Seller Accopunt created successfully");
          console.warn(result);
          this.loginOutput = result as LoginResult;
          localStorage.setItem("user", JSON.stringify(this.loginOutput.data));
          this.isUserLoggedin = true;
          this.router.navigate([""]);
        });
    }
  }


}
