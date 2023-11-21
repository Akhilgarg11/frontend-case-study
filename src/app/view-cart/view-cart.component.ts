import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {


  userId: number = -1;
  user: any = [];
  cart: any = []

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.getUserProfile();
    this.getCart();

  }

  public getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(
      (resp: Object) => {
        console.log(resp);
        this.user = resp;
      }
    );
  }


  getBase64Image(imageModel: any): SafeUrl {
    if (imageModel && imageModel.imageByte) {
      const dataUrl = `data:${imageModel.type};base64,${imageModel.imageByte}`;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return '';
  }

  getCart() {
    this.cartService.getCart(this.userId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.cart = resp;
        console.log(this.cart);

      }
    )
  }

  removeCartItem(userId: any, productId:number) {
   this.cartService.removeFromCart(userId, productId).subscribe(
    (resp: any) => {
      console.log('Cart Item Removed Successfully', resp);
      this.getCart();
    }
   )
  }

  updateQuantity(cartItem: any) {
    this.cartService.changeQuantity(cartItem.cartItemId, cartItem.quantity).subscribe(
      (resp: any) => {
        console.log('Quantity updated successfully:', resp);
      }
    );
  }

  calculateAmount(cartItem: any): number {
    if (cartItem.product && cartItem.product.price && cartItem.quantity) {
      return Number(cartItem.product.price) * cartItem.quantity;
    } else {
      return 0; 
    }
  }

}
