import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { environment } from '@app-envs/environment';
import { AuthService } from '@app/core/services/auth/auth.service';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ConversationsDb } from './conversations.db';
import { ConversationsStore } from './conversations.store';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  constructor (
    private db: ConversationsDb,
    private store: ConversationsStore,
    private auth: AuthService
  ) {
    this.db.collection$().subscribe(
      (conversations: ConversationModel[]) => store.patch({
        loading: false,
        conversations
      })
    );

    //     #################
    this.db.collection$().pipe(
      switchMap((conversations: ConversationModel[]) => {
        const convs = conversations.map(conversation => {
          return this.db.collection$(
            {
              path: `conversations/${conversation.id}/messages`,
              limitToLast: 1,
              orderBy: 'createdAt',
              orderDirection: 'asc',
              arrayContains: { arrayName: 'participantIds', value: auth.uid }
            }
          )
            .pipe(
              map((messages: MessageModel[]) =>
                Object.assign(conversation, { lastMessage: messages[0] })
              )
            );
        });
        if (environment.production === false) {
          console.groupCollapsed('CONVERSATIONS LIST W M');
          console.log(convs);
          console.groupEnd();
        }

        return combineLatest(convs);
      })
    ).subscribe(
      conversations => store.patch({
        loading: false,
        conversations
      })
    );

    // ##################

  }

  get collection$(): Observable<ConversationModel[]> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? [] : state.conversations
      )
    );
  }
}
