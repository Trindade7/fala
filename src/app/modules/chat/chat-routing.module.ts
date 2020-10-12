import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';

const routes: Routes = [
  { path: 'conversations', component: ConversationsComponent },
  { path: '', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
