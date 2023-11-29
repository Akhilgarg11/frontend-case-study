import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  isSellerLoggedIn: boolean = false;

  ngOnInit(): void {
    if(!localStorage.getItem('seller')) this.router.navigate(['/seller/login']);
    else{
      this.isSellerLoggedIn = true;
    }
  }

  constructor(private router:Router ) { }

}
