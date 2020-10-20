import { Injectable } from '@angular/core';
import { UserModel } from '@app/core/models/user.model';
import { DbFacade } from '@app/core/services/db.facade';
import { StoreGeneric } from '@app/core/services/store.generic';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContactsService {

  constructor (
    private db: ContactsServiceDb,
    private store: ContactsServiceStore
  ) {
    this.db.collection$().subscribe(
      contacts => store.patch({
        loading: false,
        contacts
      })
    );
  }

  get collection$(): Observable<UserModel[]> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? [] : state.contacts
      )
    );
  }
}

@Injectable({ providedIn: 'root' })
class ContactsServiceDb extends DbFacade<UserModel>{
  basePath = 'users';
}

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