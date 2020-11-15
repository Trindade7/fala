import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Logger as logger } from '@app-core/helpers/logger';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BatchData, FileUploadTask } from '../../models/upload-task.model';

interface QueryOptions {
  limitToLast: number;
  orderBy: 'createdAt' | 'updatedAt' | 'name' | 'email';
  orderDirection: 'asc' | 'desc';
  limitTo: number;
  arrayContains?: {
    arrayName: string;
    value: any;
  };
  path: string | null;
  startAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T> {
  private _defaultQuery: QueryOptions = {
    orderBy: 'createdAt',
    orderDirection: 'asc',
    limitTo: 20,
    limitToLast: 20,
    path: null,
  };

  protected basePath = '';

  constructor (
    @Inject(AngularFirestore) protected firestore: AngularFirestore,
    @Inject(AngularFireStorage) protected storage: AngularFireStorage,
  ) { }

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


  /**
   *
   *
   * Returns an Observable of a collection of items.
   *
   * Default options are:
   *
   * #orderBy: 'createdAt',
   *
   * #orderDirection: 'asc',
   *
   * #limitTo: 20,
   *
   * #path: null,
   *
   */
  collection$(queryOptions: Partial<QueryOptions> = this._defaultQuery): Observable<T[]> {
    logger.collapsed('[firestore.service] collection$', [queryOptions]);

    const opts: QueryOptions = Object.assign(this._defaultQuery, queryOptions);

    return this.firestore.collection<T>(
      opts.path ?? this.basePath,
      ref => {

        // if (opts.arrayContains) {
        //   return ref.where(
        //     opts.arrayContains.arrayName,
        //     'array-contains',
        //     opts.arrayContains.value
        //   );
        // }

        let query = ref.orderBy(opts.orderBy, opts.orderDirection);
        query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
        query = opts.startAt ? query.startAt(opts.startAt) : query;

        return query;
      }
    ).valueChanges().pipe(
      tap( // LOGGING DATA
        val => {
          logger.collapsed(
            `>firestore.servicce streaming [${this.basePath}] [collection$]`,
            [val, 'Options', queryOptions]);
        }
      )
    );
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

  doc$(id: string): Observable<T | null> {
    logger.startCollapsed(
      `[firestore.service] [doc$()]`,
      [{ log: ['id:', id], type: 'warn' }]
    );

    const path = `${this.basePath}/${id}`;

    return this.firestore.doc<T>(path).valueChanges()
      .pipe(tap( // LOGGING DATA
        val => logger.endCollapsed([`RESPONSE streaming from [${path}]`, val]),
        err => logger.endCollapsed([`ERROR streaming from [${path}] `, err]),
      ),
        map(docOrUndefined => docOrUndefined ?? null)
      );
  }

  docOrNull$(id: string): Observable<T | null> {
    logger.startCollapsed(
      `[firestore.service] [doc$()]`,
      [{ log: ['id:', id], type: 'warn' }]
    );

    const path = `${this.basePath}/${id}`;

    return this.firestore.doc<T>(path).valueChanges()
      .pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed([`RESPONSE streaming from [${path}]`, val]),
          err => logger.endCollapsed([`ERROR streaming from [${path}] `, err]),
        ),
        map(doc => doc ? doc : null)
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

  batchWriteDoc(batches: BatchData[]): Promise<void> {
    logger.startCollapsed('[firestore.service] [batchWriteDoc]', [batches]);

    const batch = this.firestore.firestore.batch();

    for (const batchData of batches) {
      logger.collapsed(`writing batchData of ${batchData.docId}`, [batchData]);

      const docRef = this._collection(batchData.path).doc(batchData.docId).ref;

      batchData.update ? batch.update(docRef, { ...batchData.doc })
        : batch.set(docRef, { ...batchData.doc });
    }

    return batch.commit().catch(
      err => {
        logger.collapsed('[firestore.service] ERROR UPDATING FILE', [err]);
        return err ? console.error(err) : Promise.reject(err);
      }
    ).finally(() => logger.endCollapsed(['No error']));
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
    const task = this.storage.upload(filePath + '/' + inputFile.name, inputFile);
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
