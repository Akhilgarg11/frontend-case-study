import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductResponse } from '../_model/product-response.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {


  product: Product = {
    name: "",
    price: "",
    category: "",
    details: "",
    brand: "",
    image: {} as FileHandle,
  }

  imageUrl: SafeUrl = "";

  imageFile: File = {} as File;

  fileHandle : FileHandle = {} as FileHandle;


  productId: number = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {

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

    const productFormData = this.prepareFormData(this.product);

    this.productService.updateProduct(productFormData, this.productId).subscribe(
      (response: ProductResponse) => {
        console.warn(response);
        window.alert("Product Updated Successfully")
        this.router.navigate(['/seller/viewAddedProducts']);
      }

    )
  }

  getProduct(productId: number){
    this.productService.getProductById(productId).subscribe(
      (response: any) => {
        this.product = response;
        console.warn(this.product);
        this.imageFile = response.productImage;
        console.warn(this.imageFile);
        this.imageUrl = this.getBase64Image(response.productImage);
        console.warn(this.imageUrl);
        
        this.fileHandle.file = this.imageFile;
        this.fileHandle.url = this.imageUrl;

        this.product.image = this.fileHandle;
 
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

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    formData.append(
      'imageFile',
      product.image.file,
      product.image.file.name
    );

    return formData;

  }

  onFileSelected(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0]; // Get the first selected file
        const fileHandle: FileHandle = {
          file: selectedFile,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(selectedFile)
          ),
        };

        this.product.image = fileHandle;

      }
    }
  }

  removeImage() {
    this.product.image.url = '';
  }

  clearForm(productForm: NgForm) {
    productForm.reset();
    this.product.image.url = '';
  }


}
