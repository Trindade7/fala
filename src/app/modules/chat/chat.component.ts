import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Logger as logger } from '@app-core/helpers/logger';
import { AuthService } from '@app-core/services/auth/auth.service';

import { ChatService } from './services/chat/chat.service';
import { AppSettings } from './services/chat/chat.store';
import { ListConversationsService } from './services/list-conversations/list-conversations.service';

// import { ListConversationsService } from './services/list-_conversations/list-conversations.service';

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

  appSettings: AppSettings;
  readDirection: 'end' | 'start' = 'start';

  constructor(
    private _conversations: ListConversationsService,
    public chatService: ChatService,
    private _authService: AuthService
  ) {
    this.appSettings = chatService.appSettings;
  }

  ngOnInit(): void {
    this.appSettings = this.chatService.appSettings;
    this.readDirection = this.chatService.appSettings.readMode === 'ltr' ? 'end' : 'start';

    logger.collapsed(
      '[chat.component] ',
      [this.appSettings, this._conversations.collection$]);

  }

  get sideNavState(): boolean {
    return this.chatService.appSettings.openSideNav;
  }

  toggleSideNav(): void {
    // this.sideNavOpen = !this.sideNavOpen;
    this.chatService.appSettings.toggleSideNav();
  }


  get uid(): string | null {
    return this._authService.uid;
  }

  getDate(dateStr: { seconds: number, milliseconds: number; }): number {
    // tslint:disable-next-line: no-string-literal
    return new Date(0).setUTCSeconds(dateStr.seconds);
  }
}
