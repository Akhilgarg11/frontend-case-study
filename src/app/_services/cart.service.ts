import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  // private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // updateCart(cart: any): void {
  //   this.cartSubject.next(cart);
  // }

  // getCartUpdate(): Observable<any> {
  //   return this.cartSubject.asObservable();
  // }

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

  getCartItem(userId: number, productId: number){
    return this.http.get<Object[]>(`http://localhost:8080/cart/${userId}/getCartItemByProduct/${productId}`);
  }


}
