import { Observable } from 'rxjs';

import { QueryOptionsModel } from './interfaces';

export abstract class DbFacade<T> {
    // protected abstract basePath: string;

    abstract setBasePath(path: string): void;

    abstract createId(): string;

    abstract collection$(queryOptions: Partial<QueryOptionsModel>): Observable<T[]>;

    abstract doc$(id: string): Observable<T>;

    abstract getDoc(id: string): Promise<T>;

    abstract create(document: T, id: string): Promise<void>;

    abstract update(document: T, id: string): Promise<void>;

    abstract delete(id: string): Promise<void>;

    // * ########### FILES ####################################
    // abstract addFile(inputFile: File, filePath: string): FileUploadTask;

    // abstract deleteFile(filePath: string): Observable<any>;
}
