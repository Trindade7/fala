import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageModel } from '@app-core/models/conversation.model';
import { AuthService } from '@app-core/services/auth/auth.service';

import { ChatService } from './services/chat/chat.service';
import { ConversationsService } from './services/conversations/conversations.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1000)
    ]
  );
  appSettings;
  readDirection: 'end' | 'start';

  constructor (
    private conversations: ConversationsService,
    public chatService: ChatService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    console.log(this.conversations.collection$);
    this.appSettings = this.chatService.appSettings;
    this.readDirection = this.chatService.appSettings.readMode === 'ltr' ? 'end' : 'start';
    console.log(this.appSettings);

  }

  get sideNavState(): boolean {
    return this.chatService.appSettings.openSideNav;
  }

  toggleSideNav(): void {
    // this.sideNavOpen = !this.sideNavOpen;
    this.chatService.appSettings.toggleSideNav();
  }


  get uid(): string {
    return this.authService.uid;
  }

  readConversation(event): void {
    console.log(event);
  }

  getDate(dateStr: Date): number {
    // tslint:disable-next-line: no-string-literal
    return new Date(0).setUTCSeconds(dateStr['seconds']);
  }
  sendMessage(): void {
    console.log(this.messageForm);
    if (this.messageForm.valid) {
      const message = MessageModel.empty;
      message.messageBody = this.messageForm.value;
      message.senderId = this.uid;

      this.chatService.create(message).then(
        () => console.log('sent')
      );
      this.messageForm.reset();
    } else {
      console.log('error submittion');

    }
  }
}
