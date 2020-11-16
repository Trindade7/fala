import { Injectable } from '@angular/core';
import { UserModel } from '@app/core/models/user.model';
import { DbGenericService } from '@app/core/services/db.genric.service';
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
    this._db.collection$({ orderBy: 'email' }).subscribe(
      contacts => _store.patch({
        loading: false,
        contacts
      })
    );
  }

  get collection$(): Observable<UserModel[]> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? [] : state.contacts
      )
    );
  }

  openContactConversation(contact: UserModel): void {
    this.conversationSvc.openContactConversation(contact);
  }
}



// *################## DB SERVICE ###################
@Injectable({ providedIn: 'root' })
class ContactsServiceDb extends DbGenericService<UserModel>{
  basePath = 'users';
}



// *################## STORE ###################
interface IContactsPage {
  contacts: UserModel[];
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
