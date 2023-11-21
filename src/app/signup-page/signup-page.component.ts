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

  constructor(private signupService: SignupService, private router:Router){}

  ngOnInit(): void {
    
  }

  signup(data: SignUp):void{
    this.signupService.userSignup(data).subscribe((result)=> {
      if(result){
        this.router.navigate(['login']);
        // this.router.navigate(['updateProfile'], { queryParams: { key: true } });
      }
    });
  }

  
}
