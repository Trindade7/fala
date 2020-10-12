import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../../models/user.model';
import { FireauthService } from '../firebase/fireauth.service';

export abstract class AuthFacade {
    // TODO: FIX INJECTION
    constructor (
        @Inject(FireauthService) private authService: FireauthService,
        @Inject(Router) private router: Router
    ) { }

    get user$(): Observable<UserModel> {
        return this.authService.user$;
    }
    get uid(): string {
        return this.authService.uid;
    }

    googleSignIn(): Promise<void> {
        console.log('fireauth LOGGING IN WITH GOOGLE');
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
        return this.authService.logout().then(
            () => {
                this.router.navigate(['/login']);
            }
        );
    }

}
