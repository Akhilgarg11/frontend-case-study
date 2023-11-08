import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

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
    path:'addNewProduct',
    component:AddNewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
