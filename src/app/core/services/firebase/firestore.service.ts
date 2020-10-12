import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { FileUploadTask } from '../../models/upload-task.model';

@Injectable({
  providedIn: 'root'
})


export class FirestoreService<T> {
  protected basePath: string;

  constructor (
    @Inject(AngularFirestore) protected firestore: AngularFirestore,
    @Inject(AngularFireStorage) protected storage: AngularFireStorage,
  ) {
  }

  setBasePath(path: string) {
    this.basePath = path;
  }

  private collection(path: string = this.basePath): AngularFirestoreCollection<T> {
    return this.firestore.collection(`${path}`);
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.basePath}`)
      .valueChanges().pipe(
        tap( // LOGGING DATA
          val => {
            console.groupCollapsed(
              `Firestore streaming [${this.basePath}]
              [collection$] with [query] ${queryFn}`);
            console.log(val);
            console.groupEnd();
          }
        )
      );
  }

  doc$(id: string): Observable<T> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`)
      .valueChanges().pipe(
        tap( // LOGGING DATA
          val => {
            if (environment.production === false) {
              console.groupCollapsed(`Firestore streaming fom [${this.basePath}] documentId [${id}]`);
              console.log(...[`${id} value ==>`, val]);
              console.groupEnd();
            }
          },
          err => {
            if (environment.production === false) {
              console.groupCollapsed(`ERROR Firestore streaming [${this.basePath}] [doc$] ${id}`);
              console.log(err);
              console.groupEnd();
            }
          }
        )
      );
  }

  getDoc(id: string): Promise<T> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`).get().pipe(
      map(doc => doc.data as unknown as T)
    ).toPromise();
  }

  create(document: T, docId: string): Promise<void> {
    if (environment.production === false) {
      console.groupCollapsed('FIRESTORE CREATE');
      console.log(...[document, docId]);
      console.groupEnd();
    }


    return this.collection().doc(docId).set(
      Object.assign({}, document), { merge: true }
    ).then(() => {
      if (environment.production === false) {
        console.groupCollapsed(`Firestore streaming [${this.basePath}] [create]`);
        console.log(...[this.firestore, docId]);
        console.groupEnd();
      }
    });
  }

  update(document: T, docId: string): Promise<void> {
    return this.collection().doc(docId).update(
      Object.assign({}, document)).then(() => {
        if (environment.production === false) {
          console.groupCollapsed(`Firestore streaming [${this.basePath}] [Update]`);
          console.log(docId);
          console.groupEnd();
        }
      });
  }

  delete(id: string): Promise<void> {
    return this.collection().doc(id).delete().then(() => {
      if (environment.production === false) {
        console.groupCollapsed(`Firestore streaming [${this.basePath}] [Delete]`);
        console.log(id);
        console.groupEnd();
      }
    });
  }

  // #################### FIRE STORAGE

  addFile(inputFile: File, filePath: string): FileUploadTask {
    if (environment.production === false) {
      console.groupCollapsed('[firestore.service] ADDING FILE');
      console.log(...[inputFile.name, 'path:', filePath]);
      console.groupEnd();
    }
    const task = this.storage.upload(`${this.basePath}/${filePath}`, inputFile);
    return {
      cancel: task.cancel,
      percentageChanges: task.percentageChanges,
      promiseTask: task.then
    };
  }

  /// Delete a file
  deleteFile(filePath: string): Observable<any> {
    return this.storage.ref(filePath).delete();
  }
}
