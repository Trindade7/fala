import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app/core/models/conversation.model';
import { DbFacade } from '@app/core/services/db.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { error } from 'console';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ChatService } from '../chat/chat.service';
import { MessagesDb } from '../chat/messages.db';

@Injectable({
  providedIn: 'root'
})
export class ViewConversationService {

  constructor (
    private messagesDb: MessagesDb,
    private chatService: ChatService,
    private store: ViewConversationStore
  ) {
    this.chatService.activeConversation$.pipe(
      switchMap<ConversationModel, Observable<MessageModel[]>>(conversation => {
        if (conversation.id) {
          this.messagesDb.setBasePath(`conversations/${conversation.id}/messages`);
          this.store.patch({ hasConversation: true });

          return this.messagesDb.collection$();
        } else {
          this.store.patch({ hasConversation: false });
          return of([]);
        }
      })
    ).subscribe(
      messages => this.store.patch({
        loading: false,
        messages,
      }, `Subsccribed to conversation messages`)
    );
  }

  get conversationMessages$(): Observable<MessageModel[]> {
    return this.store.state$.pipe(
      map(
        state => {
          const m = MessageModel.empty;
          m.messageBody = 'still loading';
          return state.loading ? [m] : state.messages;
        }
      )
    );
  }

  sendMessage(message: MessageModel): Promise<void> {
    if (this.store.state.hasConversation) {
      message.id = this.messagesDb.createId();
      return this.messagesDb.create(message, message.id);
    } else {
      return Promise.reject('No conversation selected');
    }
  }
}


// *################## DB SERVICE ###################

@Injectable({
  providedIn: 'root'
})
export class ViewConversationDb extends DbFacade<MessageModel>{
  basePath = 'conversations';

}


// *################ STORE #####################
interface IViewConversationPage {
  messages: MessageModel[];
  hasConversation: boolean;
  loading: boolean;
  status: string;
  error: Error;
}


@Injectable({
  providedIn: 'root'
})
export class ViewConversationStore extends StoreGeneric<IViewConversationPage>{
  protected store = 'conversations-store';

  constructor () {
    super({
      loading: true,
      messages: [],
      error: null,
      status: 'No conversation opened!'
    });
  }
}
