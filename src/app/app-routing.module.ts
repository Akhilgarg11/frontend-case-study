import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { ViewAddedProductsComponent } from './view-added-products/view-added-products.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CategoryComponent } from './category/category.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'signup',
    component:SignupPageComponent
  },
  {
    path:'login',
    component:LoginPageComponent
  },
  {
    path:'seller/addNewProduct',
    component:AddNewProductComponent
  },
  {
    path:'seller/viewAddedProducts',
    component:ViewAddedProductsComponent
  },
  {
    path:'seller/signup',
    component:SellerSignupComponent
  },
  {
    path:'seller',
    component:SellerHomeComponent
  },
  {
    path:'seller/login',
    component:SellerLoginComponent
  },
  {
    path:'seller/updateProduct/:id',
    component:SellerUpdateProductComponent
  },
  {
    path:'product/:id', 
    component: ShowProductComponent 
  },
  {
    path:'buyProduct/:productId/:quantity',
    component: BuyProductComponent
  },
  {
    path:'updateProfile',
    component: UpdateProfileComponent
  },
  {
    path:'viewCart',
    component: ViewCartComponent
  },
  {
    path:'myOrders',
    component: OrderDetailsComponent
  },
  {
    path:'category/:categoryName',
    component: CategoryComponent
  },
  {
    path:'seller/myProfile',
    component: SellerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
