import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../_services/product-service.service';



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
  areProductsPrsent: boolean = false;
  breakpoint: number = 3;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productService: ProductServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // The 'categoryName' parameter has changed
      this.category = String(params['categoryName']);
      console.log(this.category);
      this.getProductByCategory(this.category);
      this.brands = [];
      this.minPrice = 0;
      this.maxPrice = 9000000;
      if (this.category === 'Sports' || this.category === 'Kitchen Appliances' ||
        this.category === 'Fashion' || this.category === 'Grocery'
        || this.category === 'Toys & Gift') {
        this.maxPrice = 20000;
      }
    });

    this.setBreakpoint(window.innerWidth);

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
        if (this.productDetails.length >= 0) this.areProductsPrsent = true;
        console.warn(this.productDetails);
      }
    );
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  applyFilter() {
    const filterOptions = {
      category: [this.category],
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      brand: this.brands
    };

    this.productService.getFilteredProducts(filterOptions).subscribe(
      (resp: Object[]) => {
        console.warn(resp);
        console.warn("1234");
        this.productDetails = resp;
        if (this.productDetails.length === 0) this.areProductsPrsent = false;
        else this.areProductsPrsent = true;
        console.warn(this.productDetails);
      }
    );

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

  onResize(event: any) {
    this.setBreakpoint(event.target.innerWidth);
  }

  private setBreakpoint(width: number): void {
    if (width <= 750) {
      this.breakpoint = 1;
    } else if (width <= 1100) {
      this.breakpoint = 2;
    } else if (width <= 1300) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }


}
