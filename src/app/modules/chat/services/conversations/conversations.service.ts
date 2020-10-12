import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversationModel } from 'src/app/core/models/conversation.model';

import { ConversationsDb } from './conversations.db';
import { ConversationsStore } from './conversations.store';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor (
    private db: ConversationsDb,
    private store: ConversationsStore
  ) {
  }

  collection$(): Observable<ConversationModel[]> {
    return this.db.collection$();
  }
}
