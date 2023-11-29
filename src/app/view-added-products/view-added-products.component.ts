import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../_model/product-response.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-added-products',
  templateUrl: './view-added-products.component.html',
  styleUrls: ['./view-added-products.component.css']
})
export class ViewAddedProductsComponent implements OnInit {

  areProductsPresent: boolean = false;
  sellerId: number = Number(localStorage.getItem("seller"));
  displayedColumns: string[] = [ 'Product Name', 'Product Details', 'Category', 'Brand', 'Price','Image','Edit', 'Delete'];
  // productResponse: ProductResponse[] = [];
  productDetails: Product[] = [];

  ngOnInit(): void {
    if(!localStorage.getItem('seller')) this.router.navigate(['/seller/login']);
    this.getAllProducts();

  }

  constructor(private productService: ProductServiceService, private sanitizer: DomSanitizer, private router: Router) { }

  public getAllProducts() {
    this.productService.getAllProducts(this.sellerId).subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
        if(this.productDetails.length > 0) this.areProductsPresent = true;
      }
    );
  }

  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (response ) => {
        console.log(response);
        this.getAllProducts();
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
