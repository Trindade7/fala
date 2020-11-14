import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';

/**
 * Mocks the Firebase auth by automatically logging in.
 */
export const mockAngularFireAuth = jasmine.createSpy('signInWithEmailAndPassword')
    .and.returnValue(Promise.resolve({ uid: 'fakeuser' }));

/**
 * Mocks an AngularFirestore that always returns the given data for any path.
 */
export function mockAngularFirestore(data: any): AngularFirestore {
    return {
        doc: (path: string): any => {
            return {
                valueChanges() {
                    return of(data);
                }
            };
        }
    } as AngularFirestore;
}

/**
 * Mocks an AngularFirestore that always returns the given data for any path.
 */
export function mockAngularFireStorage(data: any): AngularFireStorage {
    return {
        upload: (path: string, data: any): any => {
            return {
                valueChanges() {
                    return of(data);
                }
            };
        }
    } as AngularFireStorage;
}