import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../_model/signup.model';
import { SellerSignupServiceService } from '../_services/seller-signup-service.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {

  constructor(private sellerSignupService: SellerSignupServiceService, private router:Router){}

  ngOnInit(): void {
    
  }

  signup(data: SignUp):void{
    this.sellerSignupService.sellerSignup(data).subscribe((result)=> {
      if(result){
        this.router.navigate(['seller/login']);
      }
    });
  }


}
