import { Injectable } from '@angular/core';
import { Store } from '@app-core/models/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { emptyUser, User } from '../../models/user.model';
import { StoreGeneric } from '../store.generic';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor (
        private _authSvc: AuthService,
        private _store: UserStore,
    ) {
        this._authSvc.user$.subscribe(
            user => user ? this._store.patch({
                loading: false,
                status: `User ${user.email} logged in!`,
                error: null,
                user,
            }, 'user doc') : this._store.patch({
                loading: false,
                error: Error('Error loading user')
            }, 'Error retrieving user')
        );
    }

    get state() {
        return this._store.publicGetters;
    }
}


// *################## Store ###################

interface IUserStore extends Store {
    user: User;
}

@Injectable({ providedIn: 'root' })
export class UserStore extends StoreGeneric<IUserStore> {
    protected store = 'users';

    publicGetters = {
        loading$: this.loading$,
        status$: this.status$,
        error$: this.error$,
        user$: this.user$,
        user: this.user, // TODO: REMOVE USER??
        uid: this.uid,
    };

    constructor () {
        super({
            loading: true,
            status: '',
            user: emptyUser() // * To avoid error with empty uid value getter
        });
    }

    get user$(): Observable<User> {
        return this.state$.pipe(
            map(state => state.loading ? emptyUser() : state.user)
        );
    }

    get uid(): string {
        return this.state.user.uid;
    }

    get user(): User { // TODO: REMOVE USER??
        return this.state.user;
    }
}
