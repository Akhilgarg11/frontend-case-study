import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';
import { SellerSignupServiceService } from '../_services/seller-signup-service.service';
import { SignupService } from '../_services/signup.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {

  isUserEmailAlreadyExists: boolean = false;

  constructor(private sellerSignupService: SellerSignupServiceService, private router: Router, private signupService: SignupService) { }

  ngOnInit(): void {

  }

  signup(data: SignUp): void {

    this.signupService.checkIfUserExists(data).subscribe(
      (resp: any) => {
        console.warn(resp);
        this.isUserEmailAlreadyExists = resp;
      }
    )

    if (!this.isUserEmailAlreadyExists) {
      this.sellerSignupService.sellerSignup(data).subscribe((result) => {
        if (result) {
          this.router.navigate(['seller/login']);
        }
      });
    }
  }


}
