import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  register(user: User) {

  }

  login(user: User) { 
    
  }

  logout(user: User) {

  }

  getCurrentUser() {
    /// TODO
    return false;
  }

}
