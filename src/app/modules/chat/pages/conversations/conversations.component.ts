import { Component, OnInit } from '@angular/core';

import { ListConversationsService } from '../../services/list-conversations/list-conversations.service';

@Component({
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  constructor(
    public conversationSvc: ListConversationsService
  ) { }

  ngOnInit(): void {
  }

}
