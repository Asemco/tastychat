import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../core/services/messages.service';
import { Messages } from '../models/messages';
import { UserService } from '../core/services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.scss']
})
export class MessagelistComponent implements OnInit {
  messages: Messages[];
  user: User;

  constructor(
    public messagesService: MessagesService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.messagesService.getMessages(this.userService.isLoggedIn());
    this.messages = this.messagesService.messages;
    this.user = this.userService.user;
  }
}
