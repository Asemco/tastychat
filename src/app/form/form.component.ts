import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form } from '../models/form';
import { FormService } from '../core/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() form: Form;
  @Input() user: User;
  oldStatus: String = "";
  isDisabled: boolean = false;
  submitted = false;
  snackBarRef = null;

  constructor(
    public snackBar: MatSnackBar,
    public formService: FormService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.oldStatus = this.form.status;
  }

  loggedIn() {
    return this.userService.isLoggedIn();
  }

  validateStatus() {
    if ((this.form.status.length > 0 && this.form.status.length <= 255))
      return true;
    return false;
  }

  editFormStatus(id: Number) {
    this.submitted = true;

    if (!this.user.username) {
      this.snackBarRef = this.snackBar.open("You're not logged in.  Please log in again!", 'Sure!', { duration: 7000 });
      this.formService.clearForms();
      this.userService.removeUser();
      this.submitted = false;
    }

    if (this.validateStatus()) {
      let res = this.formService.updateFormStatus(this.form);
      // My lack of Angular knowledge is showing...
      // This will be done in multiple locations for a 'smoother' experience
      setTimeout(() => { 
        if (this.oldStatus == this.formService.getForm(id).status)
          this.snackBarRef = this.snackBar.open("Your message was not saved.", 'Nooo!', { duration: 7000 });

        this.snackBarRef = this.snackBar.open("Your message was saved successfully!", 'Okay!', { duration: 7000 });
        this.submitted = false;
      }, 700);
    }
    else {
      this.snackBarRef = this.snackBar.open("That status is not valid.", 'Oh...', { duration: 7000 });
      this.submitted = false;
    }

  }
}
