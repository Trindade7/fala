import { Observable } from 'rxjs';

export abstract class StorageFacade {
    abstract addFile(file: File, filePath: string): any;

    /// Delete a file
    abstract deleteFile(filePath: string): Observable<any>;
}
