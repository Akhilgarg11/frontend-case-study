import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';
import { selectedCartItem } from '../_model/selected-cart-item.model';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {


  userId: number = -1;
  user: any = [];
  cart: any = [];
  cartItemsWithSelection: any[] = [];
  totalAmount: number = 0;
  selectedCartItems: selectedCartItem[] = [];

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.getUserProfile();
    this.getCart();
  }

  initializeCartItemsSelection() {
    if (this.cart && this.cart.cartItems) {
      this.cart.cartItems.forEach((item: any) => {
        item.selected = true;
        this.cartItemsWithSelection.push(item);
        console.log(item.selected);
      });
    }
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
        this.initializeCartItemsSelection();
        // this.selectedItems();
      }
    )
  }

  removeCartItem(userId: any, productId: number) {
    this.cartService.removeFromCart(userId, productId).subscribe(
      (resp: any) => {
        console.log('Cart Item Removed Successfully', resp);

        this.ngOnInit();
      }
    );
  }

  updateQuantity(cartItem: any) {
    this.cartService.changeQuantity(cartItem.cartItemId, cartItem.quantity).subscribe(
      (resp: any) => {
        console.log('Quantity updated successfully:', resp);
        this.selectedItems();
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

  onCheckboxChange(cartItem: any) {

    console.log(cartItem, cartItem.selected);

    if (cartItem.selected) {
      this.cartItemsWithSelection.push(cartItem);
    } else {
      const index = this.cartItemsWithSelection.findIndex(item => item === cartItem);
      if (index !== -1) {
        this.cartItemsWithSelection.splice(index, 1);
      }
    }
    this.cdr.detectChanges();
    this.selectedItems();
  }

  selectedItems() {
    const selectedItems = this.cartItemsWithSelection.filter(item => item.selected);
    this.totalAmount = 0;
    this.selectedCartItems = [];
    console.log('Selected Items:', selectedItems);

    for (let item of selectedItems) {
      this.totalAmount += Number(item.product.price) * (item.quantity);
      let x: selectedCartItem = {
        product: item.product,
        quantity: item.quantity
      }

      selectedItems.push(x);

    }

    console.log(this.selectedCartItems);
    console.log(this.totalAmount);

  }

  placeOrder() {

  }

}
