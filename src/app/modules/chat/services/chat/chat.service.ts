import { Injectable } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { Logger } from '@app/core/helpers/logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings, ChatStore } from './chat.store';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  Logger = new Logger();

  constructor (
    private _store: ChatStore,
  ) {
  }

  get appSettings(): AppSettings {
    return this._store.appSettings;
  }

  get activeConversation$(): Observable<ConversationModel | undefined> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? ConversationModel.empty : state.conversation
      )
    );
  }

  openSnackBar(): void {
    console.log('san;');
  }

}
