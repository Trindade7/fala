import { DbFacade } from '@app/core/models/db.facade';
import { QueryOptions } from '@app/core/models/interfaces';
import { Observable, of } from 'rxjs';

/**
 * Mocks db generic for tests
 */

export class MockDbGeneric<T> implements DbFacade<T>{
    protected basePath = '';
    private docs: T[];
    private doc: T;

    constructor (doc: T, docs?: T[]) {
        this.doc = doc;
        this.docs = docs ?? [];
    }

    setBasePath(path: string): void {
        this.basePath = 'tests';
    }

    createId(): string {
        return 'testId';
    }

    collection$(queryOptions: Partial<QueryOptions>): Observable<T[]> {
        return of(this.docs);
    }

    doc$(id: string): Observable<T> {
        return of(this.doc);
    }

    getDoc(id: string): Promise<T> {
        return Promise.resolve(this.doc);
    }

    create(document: T, id: string): Promise<void> {
        return Promise.resolve();
    }

    update(document: T, id: string): Promise<void> {
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        return Promise.resolve();
    }

    // * ########### FILES ####################################
    // addFile(inputFile: File, filePath: string): FileUploadTask;

    // deleteFile(filePath: string): Observable<any>;
}
