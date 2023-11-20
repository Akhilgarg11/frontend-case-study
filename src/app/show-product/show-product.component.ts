import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ProductServiceService } from '../_services/product-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{
  
    productId: number = -1;

    product: any = [];

    constructor(
      private productService: ProductServiceService,
      private sanitizer: DomSanitizer,
      private dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute
    ) { }

    ngOnInit() {
        // Retrieve the product ID from the route parameters
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        console.log(this.productId);
        this.getProductById();
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

    buyProduct(productId: number){
      this.router.navigate(['/buyProduct', productId ])
    }
  
}
