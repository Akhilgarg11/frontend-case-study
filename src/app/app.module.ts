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
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerNavbarComponent } from './seller-navbar/seller-navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { ViewAddedProductsComponent } from './view-added-products/view-added-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowProductComponent } from './show-product/show-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CategoryComponent } from './category/category.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryNavbarComponent } from './category-navbar/category-navbar.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupPageComponent,
    HomeComponent,
    LoginPageComponent,
    AddNewProductComponent,
    SellerHomeComponent,
    SellerSignupComponent,
    SellerLoginComponent,
    SellerNavbarComponent,
    ViewAddedProductsComponent,
    SellerUpdateProductComponent,
    ImageDialogComponent,
    ShowProductComponent,
    BuyProductComponent,
    UpdateProfileComponent,
    ViewCartComponent,
    OrderDetailsComponent,
    CategoryComponent,
    CategoryNavbarComponent,
    SellerProfileComponent,
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
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
