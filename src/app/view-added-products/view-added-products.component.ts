import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../_model/product-response.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-added-products',
  templateUrl: './view-added-products.component.html',
  styleUrls: ['./view-added-products.component.css']
})
export class ViewAddedProductsComponent implements OnInit {


  sellerId: number = Number(localStorage.getItem("seller"));
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Details', 'Category', 'Brand', 'Price','Image','Edit', 'Delete'];
  // productResponse: ProductResponse[] = [];
  productDetails: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();

  }

  constructor(private productService: ProductServiceService, private sanitizer: DomSanitizer) { }

  public getAllProducts() {
    this.productService.getAllProducts(this.sellerId).subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
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
