import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  {
    path: '',
    component: ConversationsComponent,
    pathMatch: 'full',
    children: [
      { path: ':id', component: ConversationsComponent },
      { path: '', component: ConversationsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
