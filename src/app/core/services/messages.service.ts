import { Injectable } from '@angular/core';
import { Messages } from '../../models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Messages[];

  constructor() {
    this.messages = [
      { id: 1, likes: 0, date_created: "", liked: false, message: "This is the message that needs to be delivered at the utmost importance."},
      { id: 2, likes: 0, date_created: "", liked: false, message: "This is the message that needs to be delivered at the earliest if possible please and thanks."},
      { id: 3, likes: 0, date_created: "", liked: false, message: "This is the message that needs to be delivered whenever you want really."},
      { id: 4, likes: 0, date_created: "", liked: false, message: "This is the message that needs to be deleted."},
      { id: 5, likes: 0, date_created: "", liked: false, message: "This is the message that doesn't need to be delivered at all."},
      { id: 6, likes: 0, date_created: "", liked: false, message: "This is the message."},
      { id: 7, likes: 0, date_created: "", liked: false, message: "This message is last."},
    ];

   }

   getMessages() {
     return this.messages;
   }

   getMessage(id: number) {
     return this.messages.find(message => message.id == id);
   }

   getLikedMessages() {
     // Returns the messages that the current user has liked.
     // Whether the user liked the message comes from the backend so this is probably useless
     return 1;
   }

   likeMessage(messageId) {
    // Get index of message clicked on
    let index = this.messages.findIndex(message => message.id == messageId);
    // Switch its liked status
    this.messages[index].liked = !this.messages[index].liked;
    // Update the database to reflect the current status.
    if (this.messages[index].liked)
      return 1;
    return 0;
   }
}
