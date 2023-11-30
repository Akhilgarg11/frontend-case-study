import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';
import { SellerSignupServiceService } from '../_services/seller-signup-service.service';
import { SignupService } from '../_services/signup.service';
import { LoginResult } from '../_model/login-result.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {

  isUserEmailAlreadyExists: boolean = false;
  isSellerLoggedin: boolean = false;
  loginOutput: LoginResult = {} as LoginResult;
  signupForm: FormGroup = {} as FormGroup;

  constructor(private sellerSignupService: SellerSignupServiceService, private router: Router, private signupService: SignupService,
    private fb: FormBuilder) { 
      
    }

  ngOnInit(): void {
    if (localStorage.getItem('seller')) this.router.navigate(['/seller']);
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

      this.sellerSignupService.sellerSignup(data).subscribe((result: any) => {

        window.alert("Seller Accopunt created successfully");
        this.loginOutput = result as LoginResult;

        console.warn(this.loginOutput);
        localStorage.setItem("seller", JSON.stringify(this.loginOutput.data));
        this.isSellerLoggedin = true;
        this.router.navigate(["seller"]);

      });
    }
  }

}
