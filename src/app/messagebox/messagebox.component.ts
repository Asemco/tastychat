import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from '../models/messages';
import { MessagesService } from '../core/services/messages.service';
import { UserService } from '../core/services/user.service';


@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent {
  constructor(
    public snackBar: MatSnackBar,
    public messagesService: MessagesService,
    public userService: UserService
  ) { }

  submitted = false;
  message = new Messages();
  snackBarRef = null;
  
  loggedIn() {
    return this.userService.isLoggedIn();
  }

  sendMessage() {
    this.submitted = true;
    let messages = this.messagesService.messages.length

    if (this.messagesService.verifyMessage(this.message))
      this.messagesService.sendMessage(this.message);

    // My lack of Angular knowledge is showing...
    // This will be done in multiple locations for a 'smoother' experience
    setTimeout(() => { 
      if (messages == this.messagesService.messages.length)
        this.snackBarRef = this.snackBar.open("Your message was not saved.", 'Okay', { duration: 7000 });

      this.snackBarRef = this.snackBar.open("Your message was saved successfully!", 'Okay', { duration: 7000 });
      this.submitted = false;
    }, 700);

  };

  validateMessage() {
    if ((this.message.message.length > 0 && this.message.message.length <= 1234) && !this.submitted && this.userService.isLoggedIn())
      return true;
    return false;
  }

}
