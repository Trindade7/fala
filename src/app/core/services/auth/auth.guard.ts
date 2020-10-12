import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log();
          this._snackBar.open('You have to sign In', 'close', {
            duration: 2000,
          });
          this.router.navigate(['/login']);
        }
      })
    );
  }

}