import { ChangeDetectorRef, Component, NgZone, OnInit, VERSION } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services/user.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';

  breakpoint: number = 4;
  productDetails: any[] = [];
  searchString: string = '';

  categories: string[] = ['Fashion', 'Electronics', 'Home & Furniture', 'Kitchen Appliances', 'Sports', 'Grocery', 'Toys & Gift'];
  currentPage: any = 0;
  pageSize: any = 8;
  totalPages: any = 0;
  totalElements: any = 0;
  isSearchDone: boolean = false;
  userId: number = -1;
  user: any = [];
  cart: any = [];

  constructor(
    private productService: ProductServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private dataService: DataService,
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Subscribe to query parameter changes
    this.route.queryParams.subscribe((params) => {
      // Access the 'search' query parameter
      this.searchString = params['search'] || '';
      // Call a method to fetch products based on the search string
      console.log('home page');
      if (this.searchString === '') this.getAllProducts(this.currentPage, this.pageSize);
      else this.getProductsBySearchString();
    });

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;

    if (!localStorage.getItem('user')) this.dataService.setNoOfItems(0);
    else {
      this.userId = Number(localStorage.getItem("user"));
      this.dataService.setNoOfItems(this.cart.cartItems?.length || 0);

    }
  }

  public getAllProducts(currentPage: number, pageSize: number) {
    this.isSearchDone = false;
    this.productService.getTotalNoOfProducts(currentPage, pageSize).subscribe(
      (response: number) => {
        this.totalElements = response;
        this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      }
    )

    this.productService.getProducts(currentPage, pageSize).subscribe(
      (response: Object[]) => {
        console.log(response);
        this.productDetails = response;
        // this.totalPages = response.totalPages;
        // this.totalElements = response.totalElements;
        console.warn(this.productDetails);
      }
    );

  }

  public getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(
      (resp: Object) => {
        console.log(resp);
        this.user = resp;
      }
    );
  }

  getCart() {
    this.cartService.getCart(this.userId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.cart = resp;
        console.log(this.cart);
        this.dataService.setNoOfItems(this.cart.cartItems.length);
      }
    )
  }

  getProductsBySearchString() {
    this.productService.getProductsBySearchString(this.searchString).subscribe(
      (resp: Object[]) => {
        console.log(resp);
        this.productDetails = resp;
        this.isSearchDone = true;
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
    console.log('productId:', productId);
    this.router.navigate(['/product', productId]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllProducts(this.currentPage, this.pageSize);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

}
