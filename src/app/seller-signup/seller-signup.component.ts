import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';
import { SellerSignupServiceService } from '../_services/seller-signup-service.service';
import { SignupService } from '../_services/signup.service';
import { LoginResult } from '../_model/login-result.model';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {

  isUserEmailAlreadyExists: boolean = false;
  isSellerLoggedin: boolean = false;
  loginOutput: LoginResult = {} as LoginResult;

  constructor(private sellerSignupService: SellerSignupServiceService, private router: Router, private signupService: SignupService) { }

  ngOnInit(): void {
    if (localStorage.getItem('seller')) this.router.navigate(['/seller']);
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

        this.loginOutput = result as LoginResult;

        console.warn(this.loginOutput);
        localStorage.setItem("seller", JSON.stringify(this.loginOutput.data));
        this.isSellerLoggedin = true;
        this.router.navigate(["seller"]);

      });
    }
  }


}
