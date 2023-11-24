import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  productDetails: any[] = [];
  searchString: string = '';
  categories: string[] = ['Fashion', 'Electronics', 'Home & Furniture', 'Kitchen Appliances', 'Sports', 'Grocery', 'Toys & Gift'];
  currentPage : any = 0;
  pageSize: any = 10;

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to query parameter changes
    this.route.queryParams.subscribe((params) => {
      // Access the 'search' query parameter
      this.searchString = params['search'] || '';
      // Call a method to fetch products based on the search string
      console.log('home page');
      if (this.searchString === '') this.getAllProducts();
      else this.getProductsBySearchString();
    });
  }

  public getAllProducts() {
    this.productService.getProducts().subscribe(
      (response: Object[]) => {
        console.log(response);
        this.productDetails = response;
        console.warn(this.productDetails);
      }
    );

  }

  getProductsBySearchString() {
    this.productService.getProductsBySearchString(this.searchString).subscribe(
      (resp: Object[]) => {
        console.log(resp);
        this.productDetails = resp;
      }
    )
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

  onPageChange(page: number) {
    this.currentPage = page - 1; // Page number is 1-based, while Angular expects 0-based
    this.getAllProducts();
  }

}
