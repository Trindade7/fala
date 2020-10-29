import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { AuthService } from '@app/core/services/auth/auth.service';

import { ViewConversationService } from '../../pages/view-conversation/view-conversation.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPreviewComponent implements OnInit {
  @Input() conversation: ConversationModel | null = null;
  // TODO: Move this to conversation map
  readonly avatarPlaceholder = 'https://placehold.it/100x100?text=user%20avatar';

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
