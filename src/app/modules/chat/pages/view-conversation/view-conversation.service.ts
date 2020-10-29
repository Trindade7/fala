import { Injectable } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { Logger } from '@app/core/helpers/logger';
import { ConversationModel, MessageModel } from '@app/core/models/conversation.model';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth/auth.service';
import { DbFacade } from '@app/core/services/db.facade';
import { StorageFacade } from '@app/core/services/storage.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { Observable, Subscription } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { map, take } from 'rxjs/operators';

import { ChatService } from '../../services/chat/chat.service';
import { ConversationDb } from '../../services/conversation.db';

// TODO: remove from production import { watch } from 'rxjs-watcher';
@Injectable({
  providedIn: 'root'
})
export class ViewConversationService {
  private _errorLogger = new Logger();
  private _messagesSubscription: Subscription = Subscription.EMPTY;

  constructor (
    private _auth: AuthService,
    private _chatSvc: ChatService,
    private _messagesDb: MessagesDb,
    private _conversationDb: ConversationDb,
    private _store: ViewConversationStore
  ) {
  }


  /**
   * subscribes to conversation messages
   *
   */
  private subscibeToMessages(conversationId: string): void {
    this._messagesDb.setBasePath(`conversations/${conversationId}/messages`);
    if (this._messagesSubscription) {
      this._messagesSubscription.unsubscribe();
    }

    this._messagesSubscription = this._messagesDb.collection$().pipe(
      watch('messagesDb.collection$', 100) // Todo: remove
    ).subscribe(
      messages => this._store.patch({
        loading: false,
        messages
      }, `Conversation ${conversationId} selected`)
    );
  }

  /**
   * Creates a conversation Id by combining the id of both users
   *
   */
  private genConversationId(contactId: string): string {
    // ? Todo: check if conversation id exists?
    const uid = this._auth.uid as string;
    const conversationId = (contactId[0] > uid[0]) ? contactId + uid : uid + contactId;
    return conversationId;
  }

  private async createNewConversation(contact: User, conversationId: string): Promise<void> {
    logger.collapsed('No conversation for this contact', [contact, 'creating one']);
    const currentUser: User = await this._auth.user$
      .pipe(take(1))
      .toPromise() as User;

    const newConversation = new ConversationModel({
      id: conversationId,
      name: contact.name,
      users: [
        contact,
        currentUser
      ],
      createdAt: null,
      lastMessage: null
    });

    this._store.patch({
      conversation: newConversation,
      conversationStored: false
    });
  }

  private storeConversation(): Promise<void> {
    const conversation = this._store.state.conversation as ConversationModel;

    return this._conversationDb.create(conversation, conversation.id as string).then(
      () => {
        this._store.patch({
          loading: false,
          conversationStored: true
        });
      }
    );
  }

  private addUndelivered(message: MessageModel): void {
    const undeliveredMessages = this._store.state.undeliveredMessages;
    undeliveredMessages.set(message.id, message);
    this._store.patch({
      undeliveredMessages
    });
  }
  private deleteUndelivered(messageId: string): void {
    const undeliveredMessages = this._store.state.undeliveredMessages;
    undeliveredMessages.delete(messageId);
    this._store.patch({
      undeliveredMessages
    });
  }

  get conversation$(): Observable<ConversationModel | null> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? null : state.conversation
      )
    );
  }

  get messages$(): Observable<MessageModel[]> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? [] : state.messages
      )
    );
  }
  get undeliveredMessages$(): Observable<MessageModel[]> {
    return this._store.state$.pipe(
      map(
        state => [...state.undeliveredMessages.values()]
      )
    );
  }


  setActiveConversation(conversation: ConversationModel): void {
    this._chatSvc.appSettings.toggleSideNav(true);
    if (conversation.id === this._store.state.conversation?.id) {
      return;
    }

    this._store.patch({
      conversation,
      loading: true
    }, 'view-conversation.service setActiveConversation()');

    this.subscibeToMessages(conversation.id as string);
  }

  sendMessage(message: MessageModel): Promise<void> {
    if (!this._store.state.conversation) {
      return Promise.reject({ code: 'No conversation selected' });
    }

    message.id = this._messagesDb.createId();

    this.addUndelivered(message);


    message.delivered = true; // *Easiest way to tell if delivered

    if (!this._store.state.conversationStored) {
      return this.storeConversation().then(
        () => this._messagesDb.create(message, message.id).then(
          () => { this.deleteUndelivered(message.id); }
        )
      );
    }
    return this._messagesDb.create(message, message.id).then(
      () => { this.deleteUndelivered(message.id); }
    );
  }


  openContactConversation(contact: User): Promise<void> {
    const conversationId = this.genConversationId(contact.uid);

    return this._conversationDb.doc$(conversationId)
      .pipe(take(1))
      .toPromise()
      .then(conversation => conversation ?
        this.setActiveConversation(conversation)
        : this.createNewConversation(contact, conversationId)
      ).catch(err => {
        logger.collapsed('Error getting contact conversation document', [err]);
        return Promise.reject(err);
      });
  }


  /**
   *
   * * Pushes the message locally so the user dont wait long
   */
  createTemMessageState(message: MessageModel): void {
    logger.startCollapsed('got here somehow', []);
    this._store.state$.pipe(
      map(
        state => this._store.patch({
          messages: [...state.messages, message]
        }, 'so the user dont wait long')
      )
    );

    logger.endCollapsed(['Fineshed this other how', this._store.state.messages]);
  }
}


// *################## DB SERVICE ###################

@Injectable({
  providedIn: 'root'
})
class MessagesDb extends DbFacade<MessageModel>{
  basePath = 'conversations';
}

// *################ STORE #####################
interface IViewConversationPage {
  messages: MessageModel[];
  undeliveredMessages: Map<string, MessageModel>;
  conversation: ConversationModel | null;
  conversationStored: boolean;
  loading: boolean;
  status: string;
  error: Error | null;
}

@Injectable({
  providedIn: 'root'
})
class ViewConversationStore extends StoreGeneric<IViewConversationPage>{
  protected store = 'conversations-store';

  constructor () {
    super({
      loading: true,
      messages: [],
      error: null,
      conversation: null,
      status: 'No conversation opened!',
      undeliveredMessages: new Map()
    });
  }
}




// *################## STORAGE ###################

@Injectable({
  providedIn: 'root'
})
export class AlbumFormFileStorage extends StorageFacade<MessageModel>{
}