import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { AuthFacade } from './auth.facade';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _authService: AuthFacade,
    private _store: UserStore,
  ) {
  }

  googleSignIn(): Promise<void> {
    return this._authService.googleSignIn();
  }

  facebookSignIn(): Promise<void> {
    return this._authService.facebookSignIn();
  }

  emailAndPasswordSignIn(email: string, password: string): Promise<void> {
    return this._authService.emailAndPasswordSignIn(email, password);
  }

  emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    return this._authService.emailAndPasswordSignUp(email, password);
  }

  logout(): Promise<void> {
    return;
  }

  get loading$(): Observable<boolean> {
    return this._store.state$.pipe(
      map(state => state.loading)
    );
  }

  get status$(): Observable<string> {
    return this._store.state$.pipe(
      map(state => state.status)
    );
  }
  get status(): string {
    return this._store.state.status;
  }

  get user$(): Observable<User> {
    return this._store.state$.pipe(
      map(
        state => state.loading ? newUserempty : state.user
      )
    );
  }
}
