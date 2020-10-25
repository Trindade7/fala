import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@app-envs/environment';
import { auth, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserModel } from '../../models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export abstract class FireauthService {
  basePath = 'users';
  // tslint:disable-next-line: variable-name
  private _uid: string = '';

  constructor (
    private _afAuth: AngularFireAuth,
    private _db: FirestoreService<UserModel>
  ) {
    this._db.setBasePath(this.basePath);
    this.user$.pipe(
      tap(user => {
        user ? this._uid = user?.uid ?? null : this._uid = null;
      })
    ).subscribe();

  }

  get uid(): string | null {
    return this._uid;
  }

  get user$(): Observable<UserModel | null> {
    return this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._db.doc$(user.uid);
        } else {
          return of(null);
        }
      })
    );
    // try {
    //   return this._afAuth.authState.pipe(
    //     switchMap(user => {
    //       if (user) {
    //         return this._db.doc$(user.uid);
    //       } else {
    //         return of(null);
    //       }
    //     })
    //   );
    // } catch (err) {
    //   if (environment.production === false) {
    //     console.groupCollapsed('!ERROR in >fireauth.service [user$()]');
    //     console.log(err);
    //     console.groupEnd();
    //   }
    //   return err;
    // }
  }

  async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    if (credential.additionalUserInfo.isNewUser) {
      return this.updateUserData(credential.user);
    }
    return;
    // try {
    //   const provider = new auth.GoogleAuthProvider();
    //   const credential = await this._afAuth.signInWithPopup(provider);
    //   return this.updateUserData(credential.user);
    // } catch (err) {
    //   if (environment.production === false) {
    //     console.groupCollapsed('!ERROR in >fireauth.service [googleSignIn()]');
    //     console.log(err);
    //     console.groupEnd();
    //   }
    //   return err;
    // }
  }

  async facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);

    if (credential.additionalUserInfo.isNewUser) {
      return this.updateUserData(credential.user);
    }
    // try {
    //   const provider = new auth.FacebookAuthProvider();
    //   const credential = await this._afAuth.signInWithPopup(provider);

    //   return this.updateUserData(credential.user);
    // } catch (err) {
    //   if (environment.production === false) {
    //     console.groupCollapsed('!ERROR in >fireauth.service [facebookSignIn()]');
    //     console.log(err);
    //     console.groupEnd();
    //   }
    //   return err;
    // }
  }

  async emailAndPasswordSignIn(email: string, password: string): Promise<any> {
    return await this._afAuth.signInWithEmailAndPassword(email, password);
  }

  async emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user);

    // try {
    //   const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    //   return this.updateUserData(credential.user);
    // } catch (err) {
    //   if (environment.production === false) {
    //     console.groupCollapsed('!ERROR in >fireauth.service [emailAndPasswordSignIn]');
    //     console.log(err);
    //     console.groupEnd();
    //   }
    //   return err;
    // }
  }

  // TODO: KEEP THIS?
  updateUserData(user: User): Promise<void> {
    const userData: UserModel = {
      uid: user.uid,
      email: user.email,
      isVerified: user.emailVerified,
      name: user.displayName,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoURL
    };

    if (environment.production === false) {
      console.groupCollapsed('>fireauth.service: updateUserData()');
      console.log(...[userData, user]);
      console.groupEnd();
    }

    return this._db.create(userData, user.uid);
  }

  logout(): Promise<void> {
    return this._afAuth.signOut();
  }
}
