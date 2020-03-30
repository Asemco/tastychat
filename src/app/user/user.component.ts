import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public submitted: Boolean = false;
  public submittedLogin: Boolean = false;
  public submittedRegister: Boolean = false;
  public snackBarRef = null;
  public user: User = new User()

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  register() {
    this.submittedRegister = true;
    this.submitted = true;
    this.userService.register(this.user);

    // My lack of Angular knowledge is showing...
    // This will be done in multiple locations for a 'smoother' experience
    // Rather have something to show and work on it than have nothing at all.
    setTimeout(() => { 
      if (this.userService.isLoggedIn()) {
        this.snackBarRef = this.snackBar.open("Registration was successful!  You have been logged in.", 'Okay', { duration: 4000 });
        this.router.navigate(['/']);
      } else {
        this.snackBarRef = this.snackBar.open("Registration has failed.  Please try a new username.", 'Aww', { duration: 7000 });
      }
      this.submitted = false;
      this.submittedRegister = false;
    }, 2000);
    
  }
  
  login() {
    // Repeated form submission may cause this to run multiple times.
    // This should prevent that, and will stop register from causing any mishaps over here as well.
    if (this.submitted)
      return;
    this.submittedLogin = true;
    this.submitted = true;
    this.userService.login(this.user);
    
    // My lack of Angular knowledge is showing...
    // This will be done in multiple locations for a 'smoother' experience
    // Rather have something to show and work on it than have nothing at all.
    setTimeout(() => { 
      if (this.userService.isLoggedIn()) {
        this.snackBarRef = this.snackBar.open("You have been logged in.", 'Okay', { duration: 4000 });
        this.router.navigate(['/']);
      } else {
        this.snackBarRef = this.snackBar.open("Your username/password was incorrect.", 'Darn it!', { duration: 7000 });
      }
      this.submitted = false;
      this.submittedLogin = false;
    }, 2000);

  }

}
