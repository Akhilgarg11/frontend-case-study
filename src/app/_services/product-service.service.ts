import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  public getAllProducts(sellerId: number){
    return this.http.get<Product[]>(`http://localhost:8080/seller/getProducts/${sellerId}`);
  }

  public deleteProduct(productId: number){
    return this.http.get<any>(`http://localhost:8080/products/deleteProduct/${productId}`);
  }


  // public updateProduct(product: FormData ,productId: number){
  //   return this.http.post<ProductResponse>(`http://localhost:8080/products/update/${productId}`, product);
  // }

  public updateProduct(product: any, productId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  
    return this.http.post<ProductResponse>(`http://localhost:8080/products/update/${productId}`, product, httpOptions);
  }
  

  public getProductById(productId: number){
    return this.http.get<any>(`http://localhost:8080/products/getById/${productId}`);
  }

  public getProducts(){
    return this.http.get<Object[]>("http://localhost:8080/products/getAllProducts");
  }

}
