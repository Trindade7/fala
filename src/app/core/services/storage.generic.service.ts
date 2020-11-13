import { Injectable } from '@angular/core';

import { FirestorageService } from './firebase/firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageGenericService<T> extends FirestorageService {
}
