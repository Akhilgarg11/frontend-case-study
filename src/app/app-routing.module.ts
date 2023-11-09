import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
