import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { UserModel } from '@app/core/models/user.model';

import { ViewConversationService } from '../../pages/view-conversation/view-conversation.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPreviewComponent implements OnInit {
  @Input() conversation!: ConversationModel;
  // TODO: Move this to conversation map
  readonly avatarPlaceholder = 'https://placehold.it/100x100?text=user%20avatar';

  constructor (
    public chatService: ChatService,
    private _conversationSvc: ViewConversationService
  ) { }

  ngOnInit(): void { }


  openConversation(conversation: ConversationModel): void {
    this._conversationSvc.setActiveConversation(conversation);
  }

  getAvatar(users: UserModel[] = []): string | null {
    return users[0]?.photoUrl ?? null;
  }
}
