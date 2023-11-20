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

  categories: string[] = ['Fashion', 'Electronics', 'Home & Furniture', 'Kitchen Appliances', 'Sports', 'Grocery', 'Toys & Gift'];


  product: Product = {
    name: "",
    price: "",
    category: "",
    details: "",
    brand: "",
    image: {} as FileHandle,
  }

  update: any = {
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
    const productFormData = this.prepareFormData(this.update);

    this.productService.updateProduct(productFormData, this.productId).subscribe(
        (response: ProductResponse) => {
            console.warn(response);
            window.alert("Product Updated Successfully");
            this.router.navigate(['/seller/viewAddedProducts']);
        }
    );
}


  getProduct(productId: number) {
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

        // const event = new Event("change");

        // this.onFileSelected(event);

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


prepareFormData(update: Object): FormData {
  const formData = new FormData();

  console.log(JSON.stringify(update));

  formData.append(
    'product',
    new Blob([JSON.stringify(update)], { type: 'application/json' })
  );

  // // Check if a new product image is selected
  // if (product.image && product.image.file) {
  //   const imageBlob = new Blob([product.image.file], { type: product.image.file.type });
  //   formData.append(
  //     'imageFile',
  //     imageBlob,
  //     product.image.file.name
  //   );
  // } else {
  //   // If no new product image is selected, append the existing image
  //   formData.append(
  //     'imageFile',
  //     this.product.image.file,
  //     this.product.image.file.name
  //   );
  // }

  return formData;
}

  
  
  
  // onFileSelected(event: Event) {

  //   console.log("qwerrt")
  //   if (event.target instanceof HTMLInputElement) {
  //     const fileInput = event.target;
  //     if (fileInput.files && fileInput.files.length > 0) {
  //       const selectedFile = fileInput.files[0];
  //       const fileHandle: FileHandle = {
  //         file: selectedFile,
  //         url: this.sanitizer.bypassSecurityTrustUrl(
  //           window.URL.createObjectURL(selectedFile)
  //         ),
  //       };
  //       console.log("zcvb");
  //       this.product.image = fileHandle;
  //     } 
  //   }

  //   else {

  //     console.log("2345678")
  //     // If no new file is selected, retain the existing file
  //     this.product.image = this.fileHandle;
  //   }
  // }

  // removeImage() {
  //   this.product.image.url = '';
  // }

  clearForm(productForm: NgForm) {
    productForm.reset();
    this.product.image.url = '';
  }


}
