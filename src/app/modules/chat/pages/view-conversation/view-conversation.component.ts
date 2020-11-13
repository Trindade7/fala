import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@app-modules/chat/services/chat/chat.service';
import { Logger } from '@app/core/helpers/logger';
import { ConversationModel } from '@app/core/models/conversation.model';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth/auth.service';

import { ViewConversationService } from './view-conversation.service';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrls: ['./view-conversation.component.scss']
})
export class ViewConversationComponent implements OnInit {
  @Output() closeConversationEmitter = new EventEmitter<boolean>();

  Logger = new Logger();
  hideContactDetails = false;
  state = this.conversationSvc.state;

  messageForm = this._fb.group({
    messageBody: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]
    ],
  });

  constructor (
    private _chatService: ChatService,
    private _fb: FormBuilder,
    public auth: AuthService,
    public conversationSvc: ViewConversationService,
  ) { }
  ngOnInit(): void { }

  // messageAvatar(senderId: string, conversation: ConversationModel): string {
  //   let url;
  //   conversation?.users?.map(user => user.uid === senderId ? url = user.photoUrl : undefined);
  //   return url ?? 'https://placehold.it/100x100?text=user%20avatar';
  // }

  toggleContactDetails(): void {
    this.hideContactDetails = !this.hideContactDetails;
  }

  sender(senderId: string, users: User[]): User {
    for (const user of (users)) {
      if (user.uid === senderId) {
        return user as User;
      }
    }

    return users[0];

    // console.log('USERS###############', users, 'senderId', senderId);
    // throw new Error('CONVERSATION SENDER IS INVALI');
  }

  conversationAvatar(conversation: ConversationModel): string {
    let url;
    conversation?.users?.map(user => user.uid !== this.auth.uid ? url = user.photoUrl : undefined);
    return url ?? 'https://placehold.it/100x100?text=user%20avatar';
  }

  closeConversation(): void {
    this._chatService.appSettings.toggleSideNav(false);
  }
}
