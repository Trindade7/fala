import { Component, OnInit } from '@angular/core';
import { ConversationModel } from 'src/app/core/models/conversation.model';

@Component({
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations = [1, 2,];
  conversationActive: ConversationModel = {
    name: 'Enim aliquip',
    id: 'd',
    createdAt: null,
    users: [
      {
        email: '',
        photoUrl: null
      }
    ],
    lastMessage: {
      conversationId: '',
      id: '',
      createdAt: null,
      delivered: null,
      sender: null,
      messageBody: `
      Laboris aute exercitation nostrud nulla magna anim eu nulla sint.
      Commodo occaecat exercitation sint do qui quis excepteur. Aliquip
      aliqua aliqua ut commodo. Velit qui ad non enim proident non labore irure velit.
      `
    }
  };
  constructor () { }

  ngOnInit(): void {
  }

}
