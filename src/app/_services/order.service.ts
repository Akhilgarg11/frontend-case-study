import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectedCartItem } from '../_model/selected-cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  public buyNow(userId: number, productId:number, quantity:number){
    return this.http.get(`http://localhost:8080/order/${userId}/buyNow/${productId}/${quantity}`)
  }

  public placeOrder(userId: number, selectedCartItems: selectedCartItem[] ){
    return this.http.post(`http://localhost:8080/order/${userId}/createOrder`, selectedCartItems);
  }

  public getOrders(userId: number){
    return this.http.get(`http://localhost:8080/order/${userId}/getOrders`);
  }

}
