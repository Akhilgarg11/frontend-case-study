import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  productDetails: any[] = [];

  ngOnInit(): void {
    this.getAllProducts();

  }

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) { }

  public getAllProducts() {
    this.productService.getProducts().subscribe(
      (response: Object[]) => {
        console.log(response);
        this.productDetails = response;
        console.warn(this.productDetails);
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


  viewProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
}

}
