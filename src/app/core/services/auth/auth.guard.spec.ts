import { TestBed } from '@angular/core/testing';

import { MockAuthService } from '../tests/moc-auth-service';
import { UserLoggedInGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('UserLoggedInGuard with mock auth', () => {
  let guard: UserLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: new MockAuthService()
        }
      ]
    });
    guard = TestBed.inject(UserLoggedInGuard);
  });

  it('Should be created', () => {
    expect(guard).toBeTruthy();
  });

});
