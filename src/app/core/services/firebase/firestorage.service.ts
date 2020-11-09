import { Inject, Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable()
export abstract class FirestorageService<T> {
  protected basePath = '';

  constructor(
    @Inject(AngularFireStorage) protected storage: AngularFireStorage,
  ) { }

  addFile(file: File, filePath: string): AngularFireUploadTask {
    const task = this.storage.upload(filePath, file);
    return task;
  }

  /// Delete a file
  deleteFile(filePath: string): Observable<any> {
    return this.storage.ref(filePath).delete();
  }
}
