import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { mockAngularFireAuth } from './firebase/mock-firebase';
import { GuardsGuard } from './guards.guard';

describe('GuardsGuard', () => {
  let guard: GuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: mockAngularFireAuth
        }
      ]
    });
    guard = TestBed.inject(GuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
