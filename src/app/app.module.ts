import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ChatMessageComponent } from './pages/themes/chat-message/chat-message.component';
import { ChatComponent } from './pages/themes/chat/chat.component';
import { ConversationListComponent } from './pages/themes/chat/conversation-list/conversation-list.component';
import { ConversationComponent } from './pages/themes/chat/conversation/conversation.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from './shared/shared.module';
import { ConversationViewComponent } from './pages/themes/chat/conversation-view/conversation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AboutPageComponent,
    UserComponent,
    ThemesComponent,
    ChatMessageComponent,
    ChatComponent,
    ConversationListComponent,
    ConversationComponent,
    ConversationViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MatTabsModule, // TODO: PUT IN SHARED
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
