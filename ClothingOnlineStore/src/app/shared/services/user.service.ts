import { Injectable } from '@angular/core';
import { User } from 'src/app/login/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 loggedUserDetails: User = new User();

 constructor() {
  let userDetail = sessionStorage.getItem('userDetails');
  this.loggedUserDetails = JSON.parse(userDetail);
 }

}
