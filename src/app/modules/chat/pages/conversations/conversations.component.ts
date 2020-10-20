import { Component, OnInit } from '@angular/core';

import { ConversationsService } from '../../services/conversations/conversations.service';

@Component({
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  constructor (
    public conversationService: ConversationsService
  ) { }

  ngOnInit(): void {
  }

}
