import { Injectable } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { StoreModel } from '@app/core/models/interfaces';
import { UserService } from '@app/core/services/auth/user.service';
import { DbGenericService } from '@app/core/services/db.genric.service';
import { StoreGeneric } from '@app/core/services/store.generic';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListConversationsService {

  constructor (
    private _db: ConversationsDb,
    private _store: ConversationsStore,
    private _userSvc: UserService
  ) {
    this._subConversation(this._userSvc.state.uid);
  }

  private _subConversation(userId: string): void {
    logger.startCollapsed('[list-conversations.service] _subConversation()', [userId]);

    this._db.collection$(
      {
        limitTo: 20,
        orderDirection: 'desc',
        // arrayContains: {
        //   arrayName: 'users',
        //   value: user ?? { id: this._userSvc.state.uid }
        // }
      }
    ).pipe(
      // switchMap((conversations) => {
      //   logger.startCollapsed(
      //     '[list-conversations.service] this._db.collection$().subscribe()'
      //   );

      //   const convs = conversations.map(conversation => this._db.collection$(
      //     {
      //       path: `conversations/${conversation.id}/messages`,
      //       limitTo: 1,
      //       orderDirection: 'desc',
      //       orderBy: 'createdAt'
      //     }
      //   ).pipe(
      //     map(messages => Object.assign(
      //       conversation, { lastMessage: messages[0] ?? null }
      //     ) as ConversationModel)
      //   )
      //   );

      //   return combineLatest(convs);
      // }
      // ),
      // map(conversaions => this._sortByLastMessage(conversaions))
      map(conversaions => conversaions as ConversationModel[])
    ).subscribe(
      conversations => {
        this._store.patch({
          loading: false,
          conversations
        });
        logger.endCollapsed(['Got conversations\n']);
      }
    );
  }

  private _sortByLastMessage(conversations: ConversationModel[]): ConversationModel[] {
    return conversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt.seconds ?? 0;
      const bTime = b.lastMessage?.createdAt.seconds ?? 0;
      return aTime - bTime;
    }
    );
  }

  get state() {
    return this._store.publicGetters;
  }
}



// *################## DB ZONE ###################

@Injectable({
  providedIn: 'root'
})
export class ConversationsDb extends DbGenericService<ConversationModel | MessageModel>{
  basePath = 'conversations';
}
@Injectable({
  providedIn: 'root'
})
export class LastMessageDb extends DbGenericService<MessageModel>{
  basePath = 'conversations';
}



// *################## STORE ZONE ###################

interface IConversationsPage extends StoreModel {
  conversations: ConversationModel[];
}


@Injectable({
  providedIn: 'root'
})
export class ConversationsStore extends StoreGeneric<IConversationsPage>{
  protected store = 'conversations-store';
  readonly publicGetters = {
    loading$: this.loading$,
    status$: this.status$,
    error$: this.error$,
    collection$: this.collection$,
  };

  constructor (
    private _lastMessageDb: LastMessageDb
  ) {
    super({
      loading: true,
      conversations: [],
    });
  }

  get collection$(): Observable<ConversationModel[]> {
    return this.state$.pipe(
      map(state => {
        const conversations = state.conversations.map(conversation => {
          const path = `conversations/${conversation.id}/messages`;

          this._lastMessageDb.collection$({
            path,
            limitToLast: 1,
          }).subscribe(messages => conversation.lastMessage = messages[0]);

          return conversation;
        });

        return this._sortByLastMessage(conversations);
      })
    );
  }

  private _sortByLastMessage(conversations: ConversationModel[]): ConversationModel[] {
    return conversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt.seconds ?? 0;
      const bTime = b.lastMessage?.createdAt.seconds ?? 0;
      return aTime - bTime;
    }
    );
  }
}
