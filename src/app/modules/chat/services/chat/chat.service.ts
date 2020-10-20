import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { UserModel } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings, ChatStore } from './chat.store';
import { MessagesDb } from './messages.db';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor (
    private messagesDb: MessagesDb,
    private store: ChatStore,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  get currentUser$(): Observable<UserModel> {
    return this.auth.user$;
  }

  get appSettings(): AppSettings {
    return this.store.appSettings;
  }

  get activeConversation$(): Observable<ConversationModel> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? ConversationModel.empty : state.conversation
      )
    );

  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  setActiveConversation(conversation: ConversationModel): void {
    this.store.patch({
      loading: false,
      conversation
    });
  }

  create(message: MessageModel): Promise<void> {
    message.id = this.messagesDb.createId();

    console.log('SERVER TIMESTAMP', this.messagesDb.getServerTimeStamp);

    return this.messagesDb.create(message, message.id);
  }
  delete(id: string): Promise<void> {
    return this.messagesDb.delete(id);
  }

  get collection$(): Observable<MessageModel[]> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? this.store.temp : state.messages
      )
    );
  }


}
