import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { environment } from '@app-envs/environment';
import { AuthService } from '@app/core/services/auth/auth.service';
import { DbFacade } from '@app/core/services/db.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListConversationsService {

  constructor (
    private _db: ConversationsDb,
    private store: ConversationsStore,
    private auth: AuthService
  ) {
    this._db.collection$().subscribe(
      (conversations) => store.patch({
        loading: false,
        conversations: conversations as ConversationModel[]
      })
    );

    //     #################
    this._db.collection$().pipe(
      switchMap((conversations) => {
        const convs = conversations.map(conversation => {
          return this._db.collection$(
            {
              path: `conversations/${conversation.id}/messages`,
              limitToLast: 1,
              orderBy: 'createdAt',
              orderDirection: 'asc',
              arrayContains: { arrayName: 'participantIds', value: this.auth.uid }
            }
          ).pipe(
            map((messages) =>
              Object.assign(conversation as ConversationModel, { lastMessage: messages[0] ?? null })
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
  }

  get collection$(): Observable<ConversationModel[]> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? [] : state.conversations
      )
    );
  }
}



// *################## DB ZONE ###################

@Injectable({
  providedIn: 'root'
})
export class ConversationsDb extends DbFacade<ConversationModel | MessageModel>{
  basePath = 'conversations';
}



// *################## STORE ZONE ###################

interface IConversationsPage {
  conversations: ConversationModel[];
  loading: boolean;
  status: string;
  error: Error;
}


@Injectable({
  providedIn: 'root'
})
export class ConversationsStore extends StoreGeneric<IConversationsPage>{
  protected store = 'conversations-store';

  constructor () {
    super({
      loading: true,
      conversations: [],
    });
  }

}
