import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationPreviewComponent } from './components/conversation-preview/conversation-preview.component';
import { UserContactComponent } from './components/user-contact/user-contact.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ViewConversationComponent } from './pages/view-conversation/view-conversation.component';

@NgModule({
  declarations: [
    ChatComponent,
    ConversationsComponent,
    ConversationPreviewComponent,
    UserContactComponent,
    ContactListComponent,
    ConversationListComponent,
    SettingsComponent,
    ViewConversationComponent
  ],
  imports: [
    SharedModule,
    ChatRoutingModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDividerModule
  ]
})
export class ChatModule { }
