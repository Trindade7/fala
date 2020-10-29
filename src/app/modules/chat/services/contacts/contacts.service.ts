import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user.model';
import { DbFacade } from '@app/core/services/db.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ViewConversationService } from '../../pages/view-conversation/view-conversation.service';

@Injectable({ providedIn: 'root' })
export class ContactsService {

  constructor (
    private _db: ContactsServiceDb,
    private _store: ContactsServiceStore,
    private conversationSvc: ViewConversationService
  ) {
    this._db.collection$().subscribe(
      contacts => _store.patch({
        loading: false,
        contacts
      })
    );
  }

  get collection$(): Observable<User[]> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? [] : state.contacts
      )
    );
  }

  openContactConversation(contact: User): void {
    this.conversationSvc.openContactConversation(contact);
  }
}



// *################## DB SERVICE ###################
@Injectable({ providedIn: 'root' })
class ContactsServiceDb extends DbFacade<User>{
  basePath = 'users';
}



// *################## STORE ###################
interface IContactsPage {
  contacts: User[];
  loading: boolean;
  status: string;
  error: Error;
}

@Injectable({ providedIn: 'root' })
class ContactsServiceStore extends StoreGeneric<IContactsPage>{
  store = 'contats-store';

  constructor () {
    super({
      loading: true,
      contacts: [],
    });
  }
}
