import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { emptyUser, User } from '../../models/user.model';
import { StoreGeneric } from '../store.generic';
import { AuthFacade } from './auth.facade';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor (
        private _authService: AuthFacade,
        private _store: UserStore,
    ) {
        this._authService.user$.subscribe(
            user => user ? this._store.patch({
                loading: false,
                status: `User ${user.email} logged in!`,
                error: null,
                user,
            }) : this._store.patch({
                loading: false,
                error: Error('Error loading user')
            })
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

export class UserStore extends StoreGeneric<IUserStore> {
    protected store = 'users';

    publicGetters = {
        loading$: this.loading$,
        status$: this.status$,
        error$: this.error$,
        user$: this.user$,
        uid: this.uid,
    };

    constructor () {
        super({
            loading: true,
            status: '',
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
}
