import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuType: String = 'default';
  isUserLoggedin: boolean = false;
  userId: number = -1;
  cart: any = [];
  numberOfItems: number = 0;

  constructor(private router: Router, private cartService: CartService,) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if(val.url){
        if(val.url.includes('seller')){
          console.warn("in seller area");
          this.menuType="seller";
        }
        else {
          console.warn("outside seller area");
          this.menuType = 'default';
        }
      }
    });

    if(localStorage.getItem("user")) {
      this.isUserLoggedin = true;
      this.userId = Number(localStorage.getItem("user"));
      this.getCart();
    }

  }

  logout(): void {
    localStorage.removeItem("user");
    this.isUserLoggedin = false;
    this.router.navigate(['/'])

  }

  getCart() {
    this.cartService.getCart(this.userId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.cart = resp;
        this.numberOfItems = this.cart?.cartItems?.length;
        console.log(this.numberOfItems);
      }
    )
  }

}
