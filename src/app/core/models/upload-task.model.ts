import { Observable } from 'rxjs';

export interface LocalFileData {
    type: string;
    file: File;
}

export interface FileUploader {
    data: LocalFileData;
    task: FileUploadTask;
}
export interface FileUploadTask {
    percentageChanges: Observable<number | undefined>;
    onComplete: Promise<any>;
    cancel(): boolean;
    pause(): boolean;
    resume(): boolean;
}

export interface BatchData {
    path: string;
    doc: any;
    docId: string;
    update: boolean;
}

export function genBatchData(path: string, docId: string, doc: any, update = false): BatchData {
    return {
        path,
        doc,
        docId,
        update
    };
}
