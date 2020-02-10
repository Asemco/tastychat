import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(
    private httpService: HttpService
  ) { 
    this.user = new User();

    if (window.localStorage) {
      let storedUser = localStorage.getItem("user");

      if (storedUser != null) {
        this.getUser();
      }
      else {
        this.saveUser(this.user);
      }
    }
  }

  register(user: User) {
    // To defeat the quirk, we must become the quirk.  Time is limited.
    if (this.isLoggedIn()) // To defeat the quirk, we must become the quirk.  Time is limited.
     return;
   this.httpService.post('api/register', user).subscribe(
     success => {
       if (success[0]) {
         this.saveUser(success[1]);
       }
     },
     failure => {
       return [false, "Couldn't register.  Please check your network, then contact support"];
     }
   )
 }

 login(user: User) { 
   // To defeat the quirk, we must become the quirk.  Time is limited.
   if (this.isLoggedIn()) 
     return;
   this.httpService.post('api/login', user).subscribe(
     success => {
       if (success[0]) {
         this.saveUser(success[1]);
       }
     },
     failure => {
       return [false, "Couldn't log in.  Please check your network, then contact support"];
     }
   )
 }

 logout() {
   this.httpService.post('auth/logout', this.user).subscribe(
     success => {
       if (success[0]) {
         this.removeUser();
       }
     },
     failure => {
       return [false, "Couldn't logout.  Please check your network, then contact support"];
     }
   )
 }

  saveUser(user) {
    if (window.localStorage)
      localStorage.setItem("user", JSON.stringify(user));
    this.user = Object.assign(this.user, user);
  }
    
  removeUser() {
    if (window.localStorage) {
      localStorage.setItem("user", JSON.stringify(new User()));
    }
    this.user = Object.assign(this.user, new User());
  }

  getUser() {
    this.user = Object.assign(this.user, JSON.parse(localStorage.getItem("user")));
  }

  getToken(): string {
    if (this.user)
      return this.user.token
    return ""
  }
  
  isLoggedIn() {
    return this.user.token.length > 0;
  }

  getCurrentUser(): User {
    return this.user;
  }

}
