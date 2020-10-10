import { Observable } from 'rxjs';

export type FileUploadTask = {
    cancel(): boolean,
    percentageChanges(): Observable<number>,
    promiseTask(): Promise<any>,
};
