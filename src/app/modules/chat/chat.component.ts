import { Component, OnInit } from '@angular/core';

import { ConversationsService } from './services/conversations/conversations.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor (private conversations: ConversationsService) { }

  ngOnInit(): void {
    console.log(this.conversations.collection$);

  }

}
