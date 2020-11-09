import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@app-envs/environment';
import { auth, User as FireUser } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { createUser, emptyUser, User } from '../../models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export abstract class FireauthService {
  basePath = 'users';
  private _uid = '';

  constructor(
    private _afAuth: AngularFireAuth,
    private _db: FirestoreService<User>
  ) {
    this._db.setBasePath(this.basePath);
    this.user$.pipe(
      tap(user => this._uid = user.uid)
    ).subscribe();
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
    return this.processUserData(credential);
  }

  async facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    return this.processUserData(credential);
  }

  async emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    return this.processUserData(credential);
  }

  async emailAndPasswordSignIn(email: string, password: string): Promise<any> {
    return await this._afAuth.signInWithEmailAndPassword(email, password);
  }

  fireUserToUser(fireUser: FireUser | null): User {
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

  // TODO: KEEP THIS?
  processUserData(credential: auth.UserCredential): Promise<void> {
    if (environment.production === false) {
      console.groupCollapsed('>fireauth.service: processUserData()');
      console.log(...[credential.user]);
      console.groupEnd();
    }
    if (credential?.additionalUserInfo?.isNewUser) {
      const user = this.fireUserToUser(credential.user);
      return this._db.create(user, user.uid);
    }
    return Promise.resolve();
  }

  logout(): Promise<void> {
    return this._afAuth.signOut();
  }
}
