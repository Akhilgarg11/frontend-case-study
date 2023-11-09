import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductResponse } from '../_model/product-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  constructor(private http:HttpClient) { }

  public addProduct(product: FormData, sellerId: number){

    return this.http.post<ProductResponse>(`http://localhost:8080/products/addProduct/${sellerId}`, product);
  }

}
