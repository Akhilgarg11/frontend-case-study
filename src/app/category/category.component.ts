import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../_services/product-service.service';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  category: string = '';
  productDetails: any[] = [];
  minPrice: number = 0;
  maxPrice: number = 9000000;
  priceRange: number[] = [this.minPrice, this.maxPrice];
  newBrand: string = '';
  brands: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    this.category = String(this.route.snapshot.paramMap.get('categoryName'));
    console.log(this.category);
    this.getProductByCategory(this.category);
  }


  getBase64Image(imageModel: any): SafeUrl {
    if (imageModel && imageModel.imageByte) {
      const dataUrl = `data:${imageModel.type};base64,${imageModel.imageByte}`;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return '';
  }

  getProductByCategory(category: string) {
    this.productService.getProductsByCategory(category).subscribe(
      (resp: Object[]) => {
        console.warn(resp);
        console.warn("1234");
        this.productDetails = resp;
        console.warn(this.productDetails);
      }
    );
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  selectedCategory: string = '';

  applyFilter() {
    const filterOptions = {
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };
  }

  addBrand() {
    if (this.newBrand && !this.brands.includes(this.newBrand)) {
      this.brands.push(this.newBrand);
      this.newBrand = '';
    }
  }

  removeBrand(brand: string) {
    const index = this.brands.indexOf(brand);
    if (index >= 0) {
      this.brands.splice(index, 1);
    }
  }

}
