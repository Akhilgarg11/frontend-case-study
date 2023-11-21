import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ProductServiceService } from '../_services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../_services/cart.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  productId: number = -1;
  userId: number = -1;
  product: any = [];
  user: any = [];
  quantity: number = 1;

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userId = Number(localStorage.getItem("user"));
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.productId);
    this.getProductById();
    this.getUserProfile();

  }

  public getProductById() {
    this.productService.getProductById(this.productId).subscribe(
      (response: Object[]) => {
        console.log(response);
        this.product = response;
        console.warn(this.product);
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


  getBase64Image(imageModel: any): SafeUrl {
    if (imageModel && imageModel.imageByte) {
      const dataUrl = `data:${imageModel.type};base64,${imageModel.imageByte}`;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return '';
  }

  openImageDialog(imageUrl: SafeUrl): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '80%',
      data: { imageUrl: imageUrl }
    });
  }

  buyProduct(productId: number) {
    console.log(this.quantity);
    this.router.navigate(['/buyProduct', productId, this.quantity]);
  }


  addToBag() {
    console.log(this.quantity);
    if (this.quantity >= 1) {
      this.cartService.addToCart(this.userId, this.productId, this.quantity).subscribe(
        (resp: Object) => {
          console.log(resp);
          window.alert("Product Added to Cart!");
        }
      );
    }
  }

}
