import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { ConversationPreviewComponent } from './components/conversation-preview/conversation-preview.component';


@NgModule({
  declarations: [ChatComponent, ConversationsComponent, ConversationPreviewComponent],
  imports: [
    SharedModule,
    ChatRoutingModule,
  ]
})
export class ChatModule { }
