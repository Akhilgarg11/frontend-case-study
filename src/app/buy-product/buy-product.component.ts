import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../_services/user.service';

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


  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    console.log(this.productId);
    this.getProductById();
    this.getUserProfile();

  }

  public getProductById() {
    this.productService.getProductById(this.productId).subscribe(
      (response: Object) => {
        console.log(response);
        this.product = response;
        console.warn(this.product);
      }
    );

  }

  public getUserProfile(){
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

}
