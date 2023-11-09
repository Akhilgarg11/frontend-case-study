import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductServiceService } from '../_services/product-service.service';
import { ProductResponse } from '../_model/product-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {


  product: Product = {
    name: "",
    price: "",
    category: "",
    details: "",
    brand: "",
    image: {} as FileHandle,
  }

  sellerId: number = -1;

  ngOnInit(): void { 
    this.sellerId = Number(localStorage.getItem("seller"));
  }

  constructor(private productService: ProductServiceService, private sanitizer: DomSanitizer) {
  }

  addProduct(productForm: NgForm) {

    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData, this.sellerId).subscribe(
      (response: ProductResponse) => {
        console.warn(response);
        window.alert("Product Added Successfully")
        productForm.reset();
        this.product.image.url='';
      }

    )
  }

  prepareFormData(product: Product): FormData{
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type:'application/json'})
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
    this.product.image.url='';
    }

}
