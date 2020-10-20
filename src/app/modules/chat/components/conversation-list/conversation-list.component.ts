import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ConversationsService } from '../../services/conversations/conversations.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  @Output() readConversation = new EventEmitter<string>();

  constructor (
    public conversationService: ConversationsService,
  ) { }

  ngOnInit(): void {
  }

}
