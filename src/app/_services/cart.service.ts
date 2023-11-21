import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addToCart(userId:number, productId: number, quantity:number){
    return this.http.get(`http://localhost:8080/cart/${userId}/add/${productId}/${quantity}`);
  }

  getCart(userId: number){
    return this.http.get(`http://localhost:8080/cart/${userId}/getCart`);
  }

  changeQuantity(cartItemId: number, quantity: number){
    return this.http.post(`http://localhost:8080/cart/changeQuantity/${cartItemId}`, quantity)
  }

  removeFromCart(userId: number, productId: number){
    return this.http.get(`http://localhost:8080/cart/${userId}/remove/${productId}`);
  }

}
