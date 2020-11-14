import { emptyUser, User } from '@app/core/models/user.model';
import { Observable, of } from 'rxjs';

import { AuthFacade } from '../auth/auth.facade';

export class MockAuthService implements AuthFacade {
    get user$(): Observable<User | null> {
        return of(emptyUser());
    }

    googleSignIn(): Promise<void> {
        return Promise.resolve();
    }

    facebookSignIn(): Promise<void> {
        return Promise.resolve();
    }

    emailAndPasswordSignIn(email: string, password: string): Promise<void> {
        return Promise.resolve();
    }

    emailAndPasswordSignUp(email: string, password: string): Promise<void> {
        return Promise.resolve();
    }

    logout(): Promise<void> {
        return Promise.resolve();
    }
}