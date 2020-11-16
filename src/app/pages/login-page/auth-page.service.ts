import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Logger as logger } from '@app-core/helpers/logger';
import { StoreModel } from '@app/core/models/interfaces';
import { AuthService } from '@app/core/services/auth/auth.service';
import { StoreGeneric } from '@app/core/services/store.generic';

@Injectable({
  providedIn: 'root'
})
export class AuthPageService {

  constructor (
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _store: AuthPageStore
  ) {
    this._store.patch({
      loading: false,

    }, 'auth-page service started');

  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  get state() {
    return this._store.publicGetters;
  }

  signIn(email: string, password: string): void {
    this._store.patch({ loading: true, }, 'signing In');

    this._authService.emailAndPasswordSignIn(email, password).then(
      () => {
        this._store.patch({ loading: false }, 'signed In');
        this._router.navigate(['']);
      }
    ).catch(
      err => {
        this._store.patch({ loading: false }, ' error Sining In');
        this.openSnackBar(err.message);

        logger.collapsed('[auth-page.service] error Sining In', [err]);
      }
    );
  }

  signUp(email: string, password: string): void {
    this._store.patch({ loading: true, }, 'signUp');

    this._authService.emailAndPasswordSignUp(email, password).then(
      () => {
        this._store.patch({ loading: false }, 'signed In');
        this._router.navigate(['']);
      }
    ).catch(
      err => {
        this.openSnackBar(err.message);
        this._store.patch({ loading: false }, 'error Sining Up');

        logger.collapsed('[auth-page.service] error Sining up', [err]);
      }
    );
  }

  googleSignIn(): void {
    this._store.patch({ loading: true, }, 'googleSignIn');
    this._authService.googleSignIn().then(
      () => {
        this._store.patch({ loading: false }, 'signed In');
        this._router.navigate(['']);
      }
    ).catch(
      err => {
        this._store.patch({ loading: false }, 'error Sining Up');
        this.openSnackBar(err.message);

        logger.collapsed('[auth-page.service] Error in googleSignIn()', [err]);
      }
    );
  }
}




// *################## Auth page Store ###################

@Injectable({ providedIn: 'root' })
class AuthPageStore extends StoreGeneric<StoreModel>{
  protected store = 'AuthPage-store';

  readonly publicGetters = {
    loading$: this.loading$,
    status$: this.status$,
    error$: this.error$,
  };

  constructor () {
    super({
      loading: true,
      error: null,
    });
  }
}
