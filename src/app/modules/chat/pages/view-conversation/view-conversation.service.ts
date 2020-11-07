import { Injectable } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { ConversationModel, getFileTypeGroup, MessageModel } from '@app/core/models/conversation.model';
import { FileUploader, genBatchData, LocalFileData } from '@app/core/models/upload-task.model';
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
  private _messagesSubscription: Subscription = Subscription.EMPTY;

  constructor (
    private _auth: AuthService,
    private _chatSvc: ChatService,
    private _messagesDb: MessagesDb,
    private _conversationDb: ConversationDb,
    private _store: ViewConversationStore,
    private _storage: ViewConversationStorage,
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

  private createMessage(messageBody: string, uploadTask?: FileUploader): MessageModel {
    return new MessageModel({
      id: this._messagesDb.createId(),
      createdAt: new Date(),
      delivered: false,
      messageBody,
      senderId: this._auth.uid,
      file: null,
      uploadTask
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

  sendMessage(messageBody: string): Promise<void> {
    if (!this._store.state.conversation) {
      return Promise.reject({ code: 'No conversation selected' });
    }
    const message = this.createMessage(messageBody);

    this.addUndelivered(message);
    return this.deliverMessage(message);
  }

  private deliverMessage(message: MessageModel): Promise<void> {
    message.delivered = true; // *Easiest way to tell if delivered
    delete message.uploadTask; // * only for local use

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

  private deliverBatchMessage(message: MessageModel): Promise<void> {
    logger.collapsed('[view-conversation.service] deliverBatchMessage()', [message]);

    message.delivered = true; // *Easiest way to tell if delivered
    delete message.uploadTask; // * only for local use

    const convId = this._store.state.conversation?.id as string;
    const fileGroup = message.file ? getFileTypeGroup(message.file?.type) : 'other';
    const convFilesPath = `conversations/${convId}/files`;

    const fileData = genBatchData(
      convFilesPath,
      `${fileGroup}s`,
      { items: this._messagesDb.updateArrayFunction(message.file) },
      true
    );
    const messageData = genBatchData(this._messagesDb.basePath, message.id, message);

    logger.collapsed('batch data', [fileData, messageData]);

    if (!this._store.state.conversationStored) {
      return this.storeConversation().then(
        () => this._messagesDb.batchWriteDoc([fileData, messageData])
          .then(() => this.deleteUndelivered(message.id))
      );
    }
    return this._messagesDb.batchWriteDoc([fileData, messageData]).then(
      () => { this.deleteUndelivered(message.id); }
    );
  }

  /**
   *
   * * Pushes the message locally
   * * so the user doesn't have to  wait for long
   */
  createTemMessageState(message: MessageModel): void {
    logger.startCollapsed('Storing temporary message', [message]);
    this._store.state$.pipe(
      map(
        state => this._store.patch({
          messages: [...state.messages, message]
        }, 'so the user dont wait long')
      )
    );

    logger.endCollapsed(['temporary message stored', this._store.state.messages]);
  }

  sendFile(fileData: LocalFileData, messageBody: string = ''): Promise<void> {
    logger.startCollapsed(
      '[view-conversation.service] sendFile()',
      ['fileData\n', fileData, 'messageBody\n', messageBody]
    );

    const fileTypeGroup = getFileTypeGroup(fileData.type);
    const path = `conversations/${this._store.state.conversation?.id}/${fileTypeGroup}s`;
    const task = this._messagesDb.addFile(fileData.file, path);
    const message = this.createMessage(messageBody, { data: fileData, task });

    this.addUndelivered(message);

    return task.onComplete.then(
      url => {
        message.file = {
          type: fileData.type,
          url
        };

        logger.endCollapsed(['File saved at', url, '\nDelivering message...\n\n']);
        return this.deliverBatchMessage(message);
      },
      err => {
        logger.endCollapsed(['Error saving File', err]);
      }
    );
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
export class ViewConversationStorage extends StorageFacade<MessageModel>{
  basePath = 'conversations';
}
