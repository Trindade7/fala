import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { createUser, UserModel } from '@app/core/models/user.model';

import { FirestoreService } from './firestore.service';
import { mockAngularFireStorage, mockAngularFirestore } from './mock-firebase';

describe('FirestoreService tests with user as doc example', () => {
  let service: FirestoreService<UserModel>;

  beforeEach(() => {
    const user: UserModel = createUser({
      uid: 'test',
      email: 'email',
      name: 'test'
    });

    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        {
          provide: AngularFirestore,
          useValue: mockAngularFirestore(user)
        },
        {
          provide: AngularFireStorage,
          useValue: mockAngularFireStorage(user)
        },
      ]
    });
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return the doc when AngularFirestore returns value', async () => {
    const serviceUser = await service.doc$('test').toPromise();

    expect(serviceUser?.uid).toEqual('test');
  });

  // it('return undefined for wrong id', () => {
  //   const doc:
  // });

});