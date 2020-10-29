import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@app-modules/chat/services/chat/chat.service';
import { Logger } from '@app/core/helpers/logger';
import { ConversationModel } from '@app/core/models/conversation.model';
import { AuthService } from '@app/core/services/auth/auth.service';

import { ViewConversationService } from './view-conversation.service';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrls: ['./view-conversation.component.scss']
})
export class ViewConversationComponent implements OnInit {
  Logger = new Logger();

  @Output() closeConversationEmitter = new EventEmitter<boolean>();

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

  messageAvatar(senderId: string, conversation: ConversationModel): string {
    let url;
    conversation?.users?.map(user => user.uid === senderId ? url = user.photoUrl : undefined);
    return url ?? 'https://placehold.it/100x100?text=user%20avatar';
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
