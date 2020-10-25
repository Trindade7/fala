import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { AuthService } from '@app/core/services/auth/auth.service';

import { ChatService } from '../../services/chat/chat.service';
import { ViewConversationService } from '../../services/view-conversation/view-conversation.service';

@Component({
  selector: 'app-conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPreviewComponent implements OnInit {
  @Input() conversation: ConversationModel | null = null;

  constructor (
    public chatService: ChatService,
    public auth: AuthService,
    private _conversationSvc: ViewConversationService
  ) { }

  ngOnInit(): void { }


  openConversation(conversation: ConversationModel): void {
    this._conversationSvc.setActiveConversation(conversation);
  }
}
