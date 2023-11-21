import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { userResponse } from '../_model/user-response.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  isEditing = false;

  user = {
    name: '',
    email: '',
    phone: ''
  };

  userDetails = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      pincode: '',
      state: ''
    },
    cart: null,
    userOrders: null
  };

  address = {
    street: '',
    city: '',
    pincode: '',
    state: ''
  }

  userId: number = -1;

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("user"));
    this.getUserProfile();
    
  }

  constructor(private userService: UserService, private route: ActivatedRoute){
    
  }

  updateProfile(profileForm: NgForm) {

    if (profileForm.valid) {
    
      const updatedUser = {
        id:this.userId,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        address: this.address 
      };

      this.userService.updateUserProfile(updatedUser).subscribe(
        (response: any) => {
          console.log('Profile updated successfully:', response);
          window.alert("Profile Updated Successfully")
          this.isEditing = false;
        }
      );
    } else {
     
      console.log('Form is not valid');
    }
  }

  public getUserProfile(){
    this.userService.getUserProfile(this.userId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.userDetails = resp;
        this.user.name = this.userDetails.name;
        this.user.email = this.userDetails.email;
        this.user.phone = this.userDetails.phone;
        
        this.address = this.userDetails.address || {
          street: '',
          city: '',
          pincode: '',
          state: ''
        };

        console.log(this.user);
        console.log(this.address);
      }
    );
  }


  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

}
