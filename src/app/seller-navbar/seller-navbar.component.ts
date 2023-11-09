import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-navbar',
  templateUrl: './seller-navbar.component.html',
  styleUrls: ['./seller-navbar.component.css']
})
export class SellerNavbarComponent implements OnInit {

  menuType: String = 'default';
  isLoggedIn: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.includes('seller')) {
          console.warn("in seller area");
          this.menuType = "seller";
        }
        else {
          console.warn("outside seller area");
          this.menuType = 'default';
        }
      }
    });

    if (localStorage.getItem('seller') != null) this.isLoggedIn = true;

  }

  logout(): void {
    localStorage.removeItem("seller");
    this.isLoggedIn = false;
    this.router.navigate(['/'])

  }


}
