import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';

import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPreviewComponent implements OnInit {
  @Input() conversation: ConversationModel;

  constructor (public chatService: ChatService) { }

  ngOnInit(): void { }


  openConversation(conversation: ConversationModel): void {
    this.chatService.setActiveConversation(conversation);
    this.chatService.appSettings.toggleSideNav(true);
  }
}
