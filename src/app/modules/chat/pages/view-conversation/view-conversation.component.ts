import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@app-modules/chat/services/chat/chat.service';
import { Logger } from '@app/core/helpers/logger';
import { ConversationModel } from '@app/core/models/conversation.model';
import { UserModel } from '@app/core/models/user.model';
import { UserService } from '@app/core/services/auth/user.service';

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

  selectedContact: UserModel | null = null;

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
    public userSvc: UserService,
    public conversationSvc: ViewConversationService,
  ) { }

  ngOnInit(): void { }

  toggleContactDetails(): void {
    this.hideContactDetails = !this.hideContactDetails;
  }

  sender(senderId: string, users: UserModel[]): UserModel {
    for (const user of (users)) {
      if (user.uid === senderId) {
        return user as UserModel;
      }
    }

    return users[0];
  }

  conversationAvatar(conversation: ConversationModel): string {
    let url;
    conversation?.users?.map(
      user => user.uid !== this.userSvc.state.uid ? url = user.photoUrl : undefined
    );
    return url ?? 'https://placehold.it/100x100?text=user%20avatar';
  }

  closeConversation(): void {
    this._chatService.appSettings.toggleSideNav(false);
  }

  selectedAndShowContact(contactId: string, contactList: UserModel[]) {
    this.selectedContact = this.sender(contactId, contactList);
    this.hideContactDetails = false;
  }
}
