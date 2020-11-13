import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  constructor (
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.uid ? of(true) : of(false);
    // return this._authService.user$.pipe(
    //   take(1),
    //   map(user => !!user),
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       logger.collapsed('[auth.guard] canActivate', [loggedIn]);
    //       this._snackBar.open('You have to sign In', 'close', {
    //         duration: 2000,
    //       });
    //       this._router.navigate(['/login']);
    //     }

    //     logger.collapsed('[auth.guard] canActivate Error', [loggedIn]);
    //   })
    // );
  }
  // canActivate(): Observable<boolean> {
  //   return this._authService.user$.pipe(
  //     take(1),
  //     map(user => !!user.uid),
  //     tap(loggedIn => {
  //       if (!loggedIn) {
  //         logger.collapsed('[auth.guard] canActivate', [loggedIn]);
  //         this._snackBar.open('You have to sign In', 'close', {
  //           duration: 2000,
  //         });
  //         this._router.navigate(['/login']);
  //       }
  //     })
  //   );
  // }

}

@Injectable({
  providedIn: 'root'
})
export class UserNotLoggedInGuard implements CanActivate {
  constructor (
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (loggedIn) {
          this._router.navigate(['']);
        }
      })
    );
  }

}
