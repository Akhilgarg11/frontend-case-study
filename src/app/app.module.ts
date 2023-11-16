import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerNavbarComponent } from './seller-navbar/seller-navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ViewAddedProductsComponent } from './view-added-products/view-added-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupPageComponent,
    HomeComponent,
    LoginPageComponent,
    AddNewProductComponent,
    ShowProductDetailsComponent,
    SellerHomeComponent,
    SellerSignupComponent,
    SellerLoginComponent,
    SellerNavbarComponent,
    ViewAddedProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }