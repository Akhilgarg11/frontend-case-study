import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../_model/file-handle.model';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  categories: string[] = ['Fashion', 'Electronics', 'Home & Furniture', 'Kitchen Appliances', 'Sports', 'Grocery', 'Toys & Gift'];
  isEditMode: boolean = false;
  image = {} as FileHandle
  originalProduct: any = {};

  product: any = {
    name: "",
    price: "",
    category: "",
    details: "",
    brand: "",
  }

  imageUrl: SafeUrl = "";

  imageFile: File = {} as File;

  fileHandle: FileHandle = {
    file: {} as File,
    url: ''
  };


  productId: number = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    if(!localStorage.getItem('seller')) this.router.navigate(['/seller/login']);
    console.warn(this.productId);
    this.getProduct(this.productId);

  }

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router) {
  }
  updateProduct(productForm: NgForm) {
    if (this.isEditMode) {
      // Logic to save/update the product

      this.productService.updateProduct(this.product, this.productId).subscribe(
        (response: Object) => {
          console.warn(response);
          window.alert("Product Updated Successfully");
          this.router.navigate(['/seller/viewAddedProducts']);
        }
      );
    } else {
      // Enter edit mode
      this.isEditMode = true;
      // Save a copy of the original product data
      this.originalProduct = { ...this.product };
    }
  }

  getProduct(productId: number) {
    this.productService.getProductById(productId).subscribe(
      (response: any) => {
        this.product.name = response.name;
        this.product.price = response.price;
        this.product.details = response.details;
        this.product.category = response.category;
        this.product.brand = response.brand;
        console.warn(this.product);

        this.imageFile = response.productImage;
        console.warn(this.imageFile);

        this.imageUrl = this.getBase64Image(response.productImage);
        console.warn(this.imageUrl);

        this.fileHandle.file = this.imageFile;
        this.fileHandle.url = this.imageUrl;

        this.image = this.fileHandle;

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

  clearForm(productForm: NgForm) {
    productForm.reset();
    this.image.url = '';
  }

  cancelUpdate() {
    // Exit edit mode and restore original product data
    this.isEditMode = false;
    this.ngOnInit();
  }

  enterEditMode(){
    this.isEditMode = true;
  }

}
