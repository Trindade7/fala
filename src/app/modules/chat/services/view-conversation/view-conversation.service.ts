import { Injectable } from '@angular/core';
import { ErrorLogger } from '@app/core/helpers/error-log';
import { ConversationModel, MessageModel } from '@app/core/models/conversation.model';
import { UserModel } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth/auth.service';
import { DbFacade } from '@app/core/services/db.facade';
import { StorageFacade } from '@app/core/services/storage.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { Observable, Subscription } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { map, take } from 'rxjs/operators';

import { ChatService } from '../chat/chat.service';
import { ConversationDb } from '../conversation.db';

// TODO: remove from production import { watch } from 'rxjs-watcher';
@Injectable({
  providedIn: 'root'
})
export class ViewConversationService {
  private _errorLogger = new ErrorLogger();
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
    const uid = this._auth.uid;
    const conversationId = (contactId[0] > uid[0]) ? contactId + uid : uid + contactId;
    return conversationId;
  }

  private async createNewConversation(contact: UserModel, conversationId: string): Promise<void> {
    this._errorLogger.collapsed('No conversation for this contact', [contact, 'creating one']);
    const currentUser: UserModel = await this._auth.user$
      .pipe(take(1))
      .toPromise();

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
    const conversation = this._store.state.conversation;

    return this._conversationDb.create(conversation, conversation.id).then(
      () => {
        this._store.patch({
          loading: false,
          conversationStored: true
        });
      }
    );
  }

  get conversation$(): Observable<ConversationModel> {
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


  setActiveConversation(conversation: ConversationModel): void {
    this._chatSvc.appSettings.toggleSideNav(true);
    if (conversation.id === this._store.state.conversation?.id) {
      return;
    }

    this._store.patch({
      conversation,
      loading: true
    }, 'view-conversation.service setActiveConversation()');

    this.subscibeToMessages(conversation.id);
  }

  sendMessage(message: MessageModel): Promise<void> {
    if (!this._store.state.conversation) {
      return Promise.reject({ code: 'No conversation selected' });
    }

    if (!this._store.state.conversationStored) {
      return this.storeConversation().then(
        () => {
          message.id = this._messagesDb.createId();
          return this._messagesDb.create(message, message.id);
        }
      );
    }

    message.id = this._messagesDb.createId();
    return this._messagesDb.create(message, message.id);
  }

  openContactConversation(contact: UserModel): Promise<void> {
    const conversationId = this.genConversationId(contact.uid);

    return this._conversationDb.doc$(conversationId)
      .pipe(take(1))
      .toPromise()
      .then(conversation => conversation ?
        this.setActiveConversation(conversation)
        : this.createNewConversation(contact, conversationId)
      ).catch(err => {
        this._errorLogger.collapsed('Error getting contact conversation document', [err]);
        return Promise.reject(err);
      });
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
      status: 'No conversation opened!'
    });
  }
}




// *################## STORAGE ###################

@Injectable({
  providedIn: 'root'
})
export class AlbumFormFileStorage extends StorageFacade<MessageModel>{
}