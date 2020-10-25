import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { FileUploader } from '../../models/upload-task.model';

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

  setBasePath(path: string): void {
    this.basePath = path;
  }

  get getServerTimeStamp(): any {
    // return firebase.firestore.FieldValue.serverTimestamp();
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  private _collection(
    path: string = this.basePath,
    orderBy?: string,
    orderDirection?: 'asc' | 'desc'
  ): AngularFirestoreCollection<T> {
    return this.firestore.collection(path);
    // return this.firestore.collection(path, ref => ref.orderBy(orderBy, orderDirection));
  }

  createId(): string {
    return this.firestore.createId();
  }

  collection$(
    options: {
      limitToLast?: number, orderBy?: 'createdAt' | 'updatedAt',
      orderDirection?: 'asc' | 'desc',
      limitTo?: number;
      path?: string,
      arrayContains?: { arrayName: string, value: string | null; };
    } = {}
  ): Observable<T[]> {
    return this.firestore.collection<T>(
      options.path ?? this.basePath,
      ref => {
        // if (options.arrayContains) {
        //   console.log('filering', options.arrayContains.arrayName, options.arrayContains.value);

        //   return ref.where('participantIds', 'array-contains', '154NsEOViCQxtZWJVOhGlnttfrE3');
        //   // return ref.where(options.arrayContains.arrayName, 'array-contains', options.arrayContains.value);
        // }
        return ref;
        return options.orderBy ? ref.orderBy('createdAt', 'asc').limitToLast(1) : ref;
        // if (options === {}) {
        //   return ref;
        //
        ref.where(options.arrayContains.arrayName, 'array-contains', options.arrayContains.value);
        // const order = options.orderBy ? ref.orderBy(options.orderBy, options.orderDirection ?? 'asc') : ref;
        // const limitToLast = options.limitToLast ? order.limitToLast(options.limitToLast) : ref;
        // return limitToLast;
      }
    ).valueChanges().pipe(
      tap( // LOGGING DATA
        val => {
          console.groupCollapsed(
            `>firestore.servicce streaming [${this.basePath}] [collection$]`);
          console.log(val, 'Options', options);
          console.groupEnd();
        }
      )
    );

    // if (orderBy) {
    //   return this.firestore.collection<T>(
    //     this.basePath,
    //     ref => ref.orderBy(orderBy, orderDirection ?? 'asc')
    //   ).valueChanges().pipe(
    //     tap( // LOGGING DATA
    //       val => {
    //         console.groupCollapsed(
    //           `Firestore streaming [${this.basePath}]
    //           [collection$] with [query] ${orderBy}`);
    //         console.log(val);
    //         console.groupEnd();
    //       }
    //     )
    //   );
    // } else {
    //   return this.firestore.collection<T>(this.basePath)
    //     .valueChanges().pipe(
    //       tap( // LOGGING DATA
    //         val => {
    //           console.groupCollapsed(
    //             `Firestore streaming [${this.basePath}]
    //           [collection$] with [query]`);
    //           console.log(val);
    //           console.groupEnd();
    //         }
    //       )
    //     );
    // }
  }

  collectionFromPath$(
    path,
    orderBy?: 'createdAt' | 'updatedAt',
    orderDirection?: 'asc' | 'desc',
    limit?: number,
  ): Observable<any[]> {
    if (orderBy) {
      return this.firestore.collection<any>(
        path,
        ref => ref.orderBy(orderBy, 'asc').limit(limit)
      ).valueChanges().pipe(
        tap( // LOGGING DATA
          val => {
            console.groupCollapsed(
              `Firestore streaming [${path}]
              [collection$] with [query] ${orderBy}`);
            console.log(val);
            console.groupEnd();
          }
        )
      );
    } else {
      return this.firestore.collection<any>(path)
        .valueChanges().pipe(
          tap( // LOGGING DATA
            val => {
              console.groupCollapsed(
                `Firestore streaming [${path}]
              [collection$] with [query]`);
              console.log(val);
              console.groupEnd();
            }
          )
        );
    }
  }

  doc$(id: string): Observable<T | undefined> {
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

  docFromPath$(id: string, path: string): Observable<any> {
    return this.firestore.doc<any>(`${path}/${id}`)
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

    return this._collection().doc(docId).set(
      {
        ...document,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
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


  // *#################### FIRE STORAGE

  addFile(inputFile: File, filePath: string): FileUploader {
    if (environment.production === false) {
      console.groupCollapsed('[firestore.service] ADDING FILE');
      console.log(...[inputFile.name, 'path:', filePath]);
      console.groupEnd();
    }
    const task = this.storage.upload(`${this.basePath}/${filePath}`, inputFile);
    return {
      data: {
        file: inputFile,
        path: filePath,
        type: 'any'
      },
      cancel: task.cancel,
      pause: task.pause,
      resume: task.resume,
      percentageChanges: task.percentageChanges(),
    };
  }

  /// Delete a file
  deleteFile(filePath: string): Observable<any> {
    return this.storage.ref(filePath).delete();
  }
}
