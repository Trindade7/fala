import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../../models/user.model';
import { FireauthService } from '../firebase/fireauth.service';

export abstract class AuthFacade {
    // TODO: FIX INJECTION
    constructor (
        @Inject(FireauthService) private _authService: FireauthService,
        @Inject(Router) private _router: Router
    ) { }

    get user$(): Observable<UserModel | null> {
        return this._authService.user$;
    }
    get uid(): string | null {
        return this._authService.uid;
    }

    googleSignIn(): Promise<void> {
        console.log('fireauth LOGGING IN WITH GOOGLE');
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
        return this._authService.logout().then(
            () => {
                this._router.navigate(['/login']);
            }
        );
    }

}
