import { Observable } from 'rxjs';

import { FileUploadTask } from '../models/upload-task.model';
import { FirestoreService } from './firestore.service';

export abstract class DbFacade<T> {
    protected abstract basePath: string;

    constructor (private dbService: FirestoreService<T>) { }

    collection$(queryFn?): Observable<T[]> {
        return this.dbService.collection$(queryFn);
    }

    doc$(id: string): Observable<T> {
        return this.dbService.doc$(id);
    }

    getDoc(id: string): Promise<T> {
        return this.dbService.getDoc(id);
    }

    create(document: T, id: string): Promise<void> {
        return this.dbService.create(document, id);
    }

    update(document: T, id: string): Promise<void> {
        return this.dbService.update(document, id);
    }

    delete(id: string): Promise<void> {
        return this.dbService.delete(id);
    }

    // * ########### FILES ####################################
    addFile(inputFile: File, filePath: string): FileUploadTask {
        return this.dbService.addFile(inputFile, filePath);
    }

    deleteFile(filePath: string): Observable<any> {
        return this.dbService.deleteFile(filePath);
    }
}
