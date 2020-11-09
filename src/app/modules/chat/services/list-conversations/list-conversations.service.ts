import { Injectable } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { environment } from '@app-envs/environment';
import { User } from '@app/core/models/user.model';
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
    this.auth.user$.subscribe(
      user => this._subConversation(user)
    );
    // this._subConversation();
  }

  private _subConversation(user?: User): void {
    logger.startCollapsed('[list-conversations.service] _subConversation()', [user]);

    this._db.collection$(
      {
        limitTo: 20,
        orderDirection: 'desc',
        arrayContains: {
          arrayName: 'users',
          value: user ?? { id: this.auth.uid }
        }
      }
    ).pipe(
      switchMap((conversations) => {
        logger.startCollapsed(
          '[list-conversations.service] this._db.collection$().subscribe()'
        );

        const convs = conversations.map(conversation => this._db.collection$(
          {
            path: `conversations/${conversation.id}/messages`,
            limitTo: 1,
            orderDirection: 'desc',
          }
        ).pipe(
          map((messages) =>
            Object.assign(conversation as ConversationModel, { lastMessage: messages[0] ?? null })
          )
        )
        );

        if (environment.production === false) {
          console.groupCollapsed('CONVERSATIONS LIST W M');
          console.log(convs);
          console.groupEnd();
        }

        return combineLatest(convs);
      })
    ).subscribe(
      conversations => {
        logger.endCollapsed([conversations]);

        this.store.patch({
          loading: false,
          conversations
        });
        logger.endCollapsed(['Got conversations\n']);
      }
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
