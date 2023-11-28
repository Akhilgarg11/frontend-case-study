import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  ngOnInit(): void {
    if(!localStorage.getItem('seller')) this.router.navigate(['/seller/login']);
  }

  constructor(private router:Router ) { }

}
