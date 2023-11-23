import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../_services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { OrderService } from '../_services/order.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orders: any[] = [];
  userId: number = -1;
  user: any = [];
  totalAmount: number = 0;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.getUserProfile();
    this.getOrderHistory();
  }

  public getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(
      (resp: Object) => {
        console.log(resp);
        this.user = resp;
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

  public getOrderHistory(){
    this.orderService.getOrders(this.userId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.orders = resp;
      }
    );
  }

  calculateAmount(order: any): number {
    let totalAmount = 0;
  
    for (const orderItem of order.orderItems) {
      if (orderItem.product && orderItem.product.price && orderItem.quantity) {
        totalAmount += Number(orderItem.product.price) * orderItem.quantity;
      }
    }
  
    return totalAmount;
  }


}
