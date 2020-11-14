import { UserStore } from '../auth/user.service';
import { MockAuthService } from './moc-auth-service';

export class MockUserService {
    constructor (
        private _authService: MockAuthService,
        private _store: UserStore,
    ) {
        this._authService.user$.subscribe(
            user => user ? this._store.patch({
                loading: false,
                status: `User ${user.email} logged in!`,
                error: null,
                user,
            }) : this._store.patch({
                loading: false,
                error: Error('Error loading user')
            })
        );
    }

    get state() {
        return this._store.publicGetters;
    }
}