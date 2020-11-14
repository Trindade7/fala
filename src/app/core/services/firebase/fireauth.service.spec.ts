import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { emptyUser } from '@app/core/models/user.model';

import { FireauthService } from './fireauth.service';
import { mockAngularFireAuth, mockAngularFirestore } from './mock-firebase';

describe('FireauthService', () => {
  let service: FireauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: mockAngularFirestore(emptyUser())
        },
        {
          provide: AngularFireAuth,
          useValue: mockAngularFireAuth
        },
      ]
    });
    service = TestBed.inject(FireauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
