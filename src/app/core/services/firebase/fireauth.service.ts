import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Logger as logger } from '@app-core/helpers/logger';
import { auth, User as FireUser } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { createUser, emptyUser, User } from '../../models/user.model';
import { AuthFacade } from '../auth/auth.facade';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService implements AuthFacade {
  basePath = 'users';
  private _uid = '';

  constructor (
    private _afAuth: AngularFireAuth,
    private _db: FirestoreService<User>
  ) {
    this._db.setBasePath(this.basePath);
    this.user$.pipe(
      tap(user => this._uid = user.uid),
      tap(user => logger.collapsed('[fireauth.service] user$ sub', [user]))
    ).subscribe();
  }

  private _fireUserToUser(fireUser: FireUser | null): User {
    if (!fireUser) {
      throw new Error('Error getting User.');
    }
    return createUser({
      name: fireUser.displayName ?? '',
      email: fireUser.email ?? '',
      uid: fireUser.uid,
      isVerified: fireUser.emailVerified,
      phoneNumber: fireUser.phoneNumber ?? '',
      photoUrl: fireUser.photoURL ?? ''
    });
  }


  private _processUserData(credential: auth.UserCredential): Promise<void> {
    logger.collapsed('[fireauth.service] _processUserData', [credential]);

    if (credential.additionalUserInfo?.isNewUser) {
      const user = this._fireUserToUser(credential.user);
      return this._db.create(user, user.uid);
    }

    return Promise.resolve();
  }

  get uid(): string {
    return this._uid;
  }

  get user$(): Observable<User> {
    return this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._db.doc$(user.uid) as Observable<User>;
        } else {
          return of(emptyUser());
        }
      })
    );
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    return this._processUserData(credential);
  }

  async facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    return this._processUserData(credential);
  }

  async emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    return this._processUserData(credential);
  }

  async emailAndPasswordSignIn(email: string, password: string): Promise<any> {
    const credential = await this._afAuth.signInWithEmailAndPassword(email, password);
    return this._processUserData(credential);
  }

  logout(): Promise<void> {
    this._uid = '';
    return this._afAuth.signOut();
  }
}
