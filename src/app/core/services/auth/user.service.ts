import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';
import { AuthFacade } from './auth.facade';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor (
    private authService: AuthFacade,
    private store: UserStore,
  ) {
  }

  googleSignIn(): Promise<void> {
    return this.authService.googleSignIn();
  }

  facebookSignIn(): Promise<void> {
    return this.authService.facebookSignIn();
  }

  emailAndPasswordSignIn(email: string, password: string): Promise<void> {
    return this.authService.emailAndPasswordSignIn(email, password);
  }

  emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    return this.authService.emailAndPasswordSignUp(email, password);
  }

  logout(): Promise<void> {
    return;
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => state.loading)
    );
  }

  get status$(): Observable<string> {
    return this.store.state$.pipe(
      map(state => state.status)
    );
  }
  get status(): string {
    return this.store.state.status;
  }

  get user$(): Observable<UserModel> {
    return this.store.state$.pipe(
      map(
        state => state.loading ? UserModel.empty : state.user
      )
    );
  }
}
