import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Logger as logger } from '@app-core/helpers/logger';
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPageService {

  constructor (
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  signIn(email: string, password: string): void {
    this._authService.emailAndPasswordSignIn(email, password).then(
      () => {
        if (!!this._authService.user$) {
          this._router.navigate(['chat']);
        }

        logger.collapsed('[auth-page.service] UNEXPECTED ERROR googleSignIn()', []);
        throw new Error('UNEXPECTED ERROR');
      }
    ).catch(
      err => {
        logger.collapsed('[auth-page.service] error Sining In', [err]);

        this.openSnackBar(err.message);
      }
    );
  }

  signUp(email: string, password: string): void {
    this._authService.emailAndPasswordSignUp(email, password).then(
      () => this._router.navigate(['chat'])
    ).catch(
      err => {
        this.openSnackBar(err.message);

        logger.collapsed('[auth-page.service] error Sining up', [err]);
      }
    );
  }

  googleSignIn(): void {
    this._authService.googleSignIn().then(
      () => {
        if (!!this._authService.user$) {
          this._router.navigate(['chat']);
        }

        logger.collapsed('[auth-page.service] UNEXPECTED ERROR googleSignIn()', []);
        throw new Error('UNEXPECTED ERROR');
      }
    ).catch(
      err => {
        logger.collapsed('[auth-page.service] Error in googleSignIn()', [err]);
        this.openSnackBar(err.message);
      }
    );
  }

}
