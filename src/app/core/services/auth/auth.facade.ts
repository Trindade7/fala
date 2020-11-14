import { Observable } from 'rxjs';

import { User } from '../../models/user.model';

export abstract class AuthFacade {
    abstract get user$(): Observable<User | null>;

    abstract googleSignIn(): Promise<void>;

    abstract facebookSignIn(): Promise<void>;

    abstract emailAndPasswordSignIn(email: string, password: string): Promise<void>;

    abstract emailAndPasswordSignUp(email: string, password: string): Promise<void>;

    abstract logout(): Promise<void>;

}
