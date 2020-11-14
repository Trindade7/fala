import { TestBed } from '@angular/core/testing';

import { MockAuthService } from '../tests/moc-auth-service';
import { AuthService } from './auth.service';
import { UserService, UserStore } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: new MockAuthService()
        },
        {
          provide: UserStore,
          useValue: new UserStore()
        }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
