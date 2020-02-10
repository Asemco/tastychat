import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User;
  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser();
  }

  loggedIn() {
    if (this.userService.user.token)
      return true;
    return false;
  }

  logout() {
    this.userService.logout()
  }
}
