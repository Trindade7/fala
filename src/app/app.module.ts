import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignInComponent } from './pages/login-page/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/sign-up/sign-up.component';
import { ChatMessageComponent } from './pages/themes/chat-message/chat-message.component';
import { ChatComponent } from './pages/themes/chat/chat.component';
import { ConversationListComponent } from './pages/themes/chat/conversation-list/conversation-list.component';
import { ConversationViewComponent } from './pages/themes/chat/conversation-view/conversation-view.component';
import { ConversationComponent } from './pages/themes/chat/conversation/conversation.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from './shared/shared.module';

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
    ConversationViewComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent
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
