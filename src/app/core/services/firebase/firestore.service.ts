import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Logger as logger } from '@app-core/helpers/logger';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BatchData, FileUploadTask } from '../../models/upload-task.model';

@Injectable({
  providedIn: 'root'
})


export class FirestoreService<T> {
  protected basePath = '';

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
        // return options.orderBy ? ref.orderBy('createdAt', 'asc').limitToLast(1) : ref;
        // // if (options === {}) {
        // //   return ref;
        // //
        // ref.where(options.arrayContains.arrayName, 'array-contains', options.arrayContains.value);
        // const order = options.orderBy ? ref.orderBy(options.orderBy, options.orderDirection ?? 'asc') : ref;
        // const limitToLast = options.limitToLast ? order.limitToLast(options.limitToLast) : ref;
        // return limitToLast;
      }
    ).valueChanges().pipe(
      tap( // LOGGING DATA
        val => {
          logger.collapsed(
            `>firestore.servicce streaming [${this.basePath}] [collection$]`,
            [val, 'Options', options]);
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
    path: string,
    orderBy?: 'createdAt' | 'updatedAt',
    orderDirection?: 'asc' | 'desc',
    limit?: number,
  ): Observable<any[]> {
    logger.startCollapsed(`[firestore.service] [collectionFromPath$()]`, ['path:', path]);
    if (orderBy) {
      return this.firestore.collection<any>(
        path,
        ref => ref.orderBy(orderBy, 'asc').limit(limit ?? 1000)
      ).valueChanges().pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed([`[query] ${orderBy}`, val])
        )
      );
    } else {
      return this.firestore.collection<any>(path)
        .valueChanges().pipe(
          tap( // LOGGING DATA
            val => logger.endCollapsed(['No [query] collection', val])
          )
        );
    }
  }

  doc$(id: string): Observable<T | undefined> {
    logger.startCollapsed(`[firestore.service] [doc$()]`, ['id:', id]);
    const path = `${this.basePath}/${id}`;
    return this.firestore.doc<T>(path)
      .valueChanges().pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed([`RESPONSE streaming from [${path}]`, val]),
          err => logger.endCollapsed([`ERROR streaming from [${path}] `, err]),
        ),
      );
  }

  docFromPath$(path: string): Observable<any> {
    logger.startCollapsed(`[firestore.service] [docdocFromPath$()]`, [`path: ${path}`]);
    return this.firestore.doc<any>(path)
      .valueChanges().pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed(['RESPONSE', val]),
          err => logger.endCollapsed(['ERROR', err]),
        ),
      );
  }

  getDoc(id: string): Promise<T> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`).get().pipe(
      map(doc => doc.data as unknown as T)
    ).toPromise();
  }

  create(document: T, docId: string): Promise<void> {
    logger.startCollapsed(
      `[firestore.service] [create()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${this.basePath}`]
    );

    return this._collection().doc(docId).set(
      {
        ...document,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    ).then(() => logger.endCollapsed());
  }

  update(document: T, docId: string): Promise<void> {
    logger.startCollapsed(
      `[firestore.service] [update()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${this.basePath}`]
    );
    return this._collection().doc(docId).update(Object.assign({}, document))
      .then(() => logger.endCollapsed());
  }

  delete(id: string): Promise<void> {
    logger.startCollapsed(
      `[firestore.service] [delete()]`,
      [`documentId: ${id}`, `path: ${this.basePath}`]
    );
    return this._collection().doc(id).delete().then(() => logger.endCollapsed());
  }

  batchWriteDoc(batches: BatchData[], update: boolean = false): Promise<void> {
    logger.startCollapsed('[firestore.service] [batchWriteDoc]', [batches, 'update', update]);

    const batch = this.firestore.firestore.batch();

    for (const batchData of batches) {
      logger.collapsed(`writing batchData of ${batchData.docId}`, [batchData]);

      const docRef = this._collection(batchData.path).doc(batchData.docId).ref;

      update ? batch.update(docRef, batchData.doc)
        : batch.set(docRef, batchData.doc);
    }

    logger.endCollapsed();
    return batch.commit();
  }

  updateArrayFunction(value: any): any {
    return firebase.firestore.FieldValue.arrayUnion(value);
  }


  // *#################### FIRE STORAGE

  addFile(inputFile: File, filePath: string): FileUploadTask {
    logger.collapsed(
      '[firestore.service] [addFile()]',
      ['file', inputFile, `filePath:${filePath}`]
    );
    const task = this.storage.upload(`${this.basePath}/${filePath}`, inputFile);
    return {
      cancel: task.cancel,
      pause: task.pause,
      resume: task.resume,
      percentageChanges: task.percentageChanges(),
      onComplete: task.then(f => f.ref.getDownloadURL()),
    };
  }

  /// Delete a file
  deleteFile(filePath: string): Observable<any> {
    logger.collapsed('[firestore.service] [deleteFile()]', [`filePath: ${filePath}`]);
    return this.storage.ref(filePath).delete();
  }
}
