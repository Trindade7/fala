import { Injectable } from '@angular/core';

import { FirestoreService } from './firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DbGenericService<T> extends FirestoreService<T>{
}
