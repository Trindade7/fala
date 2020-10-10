import { Injectable, Inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class FirestorageService<T> {
  protected basePath: string;

  constructor(
    @Inject(AngularFireStorage) protected storage: AngularFireStorage,
  ) { }

  addFile(inputFile: File, fileName: string, filePath: string): AngularFireUploadTask {
    if (inputFile.name !== fileName) {
      if (environment.production === false) {
        console.groupCollapsed('ADDFILE CHANGING NAMES');
        console.log(...[inputFile.name, fileName]);
        console.groupEnd();
      }

      Object.defineProperty(inputFile, 'name', {
        writable: true,
        value: fileName
      });
    }
    const task = this.storage.upload(`${this.basePath}/${filePath}`, inputFile);
    return task;
  }

  /// Delete a file
  deleteFile(filePath: string): Observable<any> {
    return this.storage.ref(filePath).delete();
  }
}
