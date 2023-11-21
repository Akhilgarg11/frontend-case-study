import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number){
    return this.http.get(`http://localhost:8080/getprofile/${userId}`)
  }

  updateUserProfile( updatedUser: Object){
    return this.http.post(`http://localhost:8080/updateProfile`, updatedUser);
  }

}
