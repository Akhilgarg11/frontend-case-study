import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  public buyNow(userId: number, productId:number, quantity:number){
    return this.http.get(`http://localhost:8080/order/${userId}/buyNow/${productId}/${quantity}`)
  }

}
