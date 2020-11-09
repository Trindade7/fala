import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ListConversationsService } from '../../services/list-conversations/list-conversations.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {
  @Output() readConversation = new EventEmitter<string>();

  constructor(
    public conversationSvc: ListConversationsService,
  ) { }

  ngOnInit(): void {
  }

}
