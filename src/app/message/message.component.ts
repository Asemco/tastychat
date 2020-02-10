import { Component, Input } from '@angular/core';
import { MessagesService } from '../core/services/messages.service';
import { Messages } from '../models/messages';
import { User } from '../models/user';
import { UserService } from '../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: Messages;
  @Input() user: User;
  isDisabled: boolean = false;
  snackBarRef = null;

  constructor(
    public snackBar: MatSnackBar,
    public messagesService: MessagesService,
    public userService: UserService
  ) { }

  expressFeelings(id: number) {
    this.isDisabled = true;
    this.messagesService.expressFeelings(id);

    // My lack of Angular knowledge is showing...
    // This will be done in multiple locations for a 'smoother' experience
    setTimeout(() => { 
      if (this.message.liked == this.user.username) {
        this.message.likes--;
        this.message.liked = "";
        this.snackBarRef = this.snackBar.open("Your joy has been revoked.", 'Okay', { duration: 7000 });
      }
      else {
        this.message.likes++;
        this.message.liked = this.user.username;
        this.snackBarRef = this.snackBar.open("Your joy has been shared!", 'Okay', { duration: 7000 });
      }
      this.isDisabled = false;
    }, 700);
  }
}
