import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../_services/user.service';
import { OrderService } from '../_services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})

export class BuyProductComponent implements OnInit {

  userId: number = -1;
  productId: number = -1;
  product: any = [];
  quantity: number = 1;
  user: any = [];
  currentDate = new Date();
  futureDate = new Date(this.currentDate);
  amount: number = 0;
  price: number = 0;


  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.quantity = Number(this.route.snapshot.paramMap.get('quantity'));
    console.log(this.productId);
    this.getProductById();
    this.getUserProfile();
    this.futureDate.setDate(this.currentDate.getDate() + 5);
  }

  public getProductById() {
    this.productService.getProductById(this.productId).subscribe(
      (response: Object) => {
        console.log(response);
        this.product = response;
        console.warn(this.product);
        this.price = parseFloat(this.product.price);
        console.log(this.price);
        console.log(this.product.price);
        this.amount = this.quantity * this.price;

      }
    );

  }

  public getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(
      (resp: Object) => {
        console.log(resp);
        this.user = resp;
      }
    );
  }

  public getBase64Image(imageModel: any): SafeUrl {
    if (imageModel && imageModel.imageByte) {
      const dataUrl = `data:${imageModel.type};base64,${imageModel.imageByte}`;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return '';
  }

  public updateProfile() {
    this.router.navigate(['updateProfile']);
  }

  public placeOrder() {
    this.orderService.buyNow(this.userId, this.productId, this.quantity ).subscribe(
      (resp: Object) => {
        console.log(resp);
        // window.alert("Order Placed Successfully");
        this.showSnackbar("Order Placed Successfully");
        this.router.navigate(['']);
      }
    )
  }

  public onQuantityChange() {
    this.amount = this.price * this.quantity;
  }

  showSnackbar(message: string): void {
    const snackbarRef = this.snackBar.open(message, 'Close', {
      duration: 10000,
      panelClass: 'custom-snackbar',
    });

    snackbarRef.onAction().subscribe(() => {
      snackbarRef.dismiss();
    });
  }

}
