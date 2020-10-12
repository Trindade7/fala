import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UserModel } from '../../models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  basePath = 'users';
  private _uid: string;

  constructor (
    private afAuth: AngularFireAuth,
    private db: FirestoreService<UserModel>
  ) {
    this.db.setBasePath(this.basePath);
    this.user$.pipe(
      tap(user => {
        console.log(user);
        this._uid = user.uid;
      })
    ).subscribe();

  }

  get uid(): string {
    return this._uid;
  }

  get user$(): Observable<UserModel> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc$(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn(): Promise<void> {
    // console.log('fireauth LOGGING IN WITH GOOGLE');
    // try {
    //   const provider = new auth.GoogleAuthProvider();
    //   const credential = await this.afAuth.signInWithPopup(provider);
    //   return this.updateUserData(credential.user);
    // } catch (err) {
    //   return err;
    // }
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log('googleSignIn() >>>>>>>>');

    return this.updateUserData(credential.user);
  }

  async facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    return this.updateUserData(credential.user);
  }

  emailAndPasswordSignIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      credential => {
        console.log('emailAndPasswordSignIn() >>>>>>>>');
        this.updateUserData(credential.user);
      }
    ).catch(err => {
      if (environment.production === false) {
        console.groupCollapsed('>fireauth.service [emailAndPasswordSignIn]');
        console.log(err);
        console.groupEnd();
      }
      return err;
    });

    // return this.updateUserData(credential.user);
    // console.log('fireauth LOGGING IN WITH GOOGLE');
    // try {
    //   const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    //   return this.updateUserData(credential.user);
    // } catch (err) {
    //   return err;
    // }
  }

  async emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log('emailAndPasswordSignUp() >>>>>>>>');

    return this.updateUserData(credential.user);
  }

  // TODO: KEEP THIS?
  updateUserData(user: User) {
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

    return this.db.create(userData, user.uid);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
