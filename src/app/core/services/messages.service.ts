import { Injectable, OnInit } from '@angular/core';
import { Messages } from '../../models/messages';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public messages: Messages[];

  constructor(
    private httpService: HttpService,
    private userService: UserService
  ) {
    this.messages = [];
  }

  retrieveAuthMessages() {
    this.httpService.get('auth/messages', null).subscribe(
      success => {
        if (success[0])
          this.messages = Object.assign(this.messages, success[1]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  retrieveMessages() {
    this.httpService.get('api/messages', null).subscribe(
      success => {
        if (success[0])
          this.messages = Object.assign(this.messages, success[1]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  sendMessage(message) {
    this.httpService.post('auth/create-message', message).subscribe(
      success => {
        if (success[0])
          this.messages = Object.assign(this.messages, [...this.messages, success[1]]);
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  // Since it's used to unlike as well, it's called express feelings.
  expressFeelings(messageId: number) {
    this.httpService.post('auth/express-feelings', {messageId}).subscribe(
      success => {
        if (success[0]) {
          this.messages = Object.assign(this.messages, ...this.messages);
        }
      },
      failure => {
        console.log("Failed because reasons: ", failure);
      }
    )
  }

  verifyMessage(messages: Messages): boolean {
    return messages.message.length > 0 && messages.message.length <= 1234;
  }

  getMessages(isLoggedIn) {
    if (isLoggedIn)
      return this.retrieveAuthMessages();
    else
      return this.retrieveMessages();
  }

  getMessage(id: number) {
    return this.messages.find(message => message.id == id);
  }

  getLikedMessages() {
    // Returns the messages that the current user has liked.
    // Whether the user liked the message comes from the backend so this is probably useless
    return 1;
  }
}
