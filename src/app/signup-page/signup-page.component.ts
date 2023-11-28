import { Component, OnInit } from '@angular/core';
import { SignupService } from '../_services/signup.service';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  isUserEmailAlreadyExists: boolean = false;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {

  }

  signup(data: SignUp): void {

    // this.signupService.checkIfUserExists(data).subscribe(
    //   (resp: any) => {
    //     console.warn(resp);
    //     this.isUserEmailAlreadyExists = resp;
    //   }
    // )

    // if (this.isUserEmailAlreadyExists) {
      this.signupService.userSignup(data).subscribe(
        (result: any) => {
          console.warn(result);
          if (result) {
            this.router.navigate(['login']);
          }
          else{
            this.isUserEmailAlreadyExists = true;
          }
        });
    }
  // }


}
