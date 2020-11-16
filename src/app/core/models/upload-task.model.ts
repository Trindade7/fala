import { Observable } from 'rxjs';

export interface LocalFileDataModel {
    type: string;
    file: File;
}

export interface FileUploaderModel {
    data: LocalFileDataModel;
    task: FileUploadTask;
}
export interface FileUploadTask {
    percentageChanges: Observable<number | undefined>;
    onComplete: Promise<any>;
    cancel(): boolean;
    pause(): boolean;
    resume(): boolean;
}

export interface BatchDataModel {
    path: string;
    doc: any;
    docId: string;
    update: boolean;
}

export function genBatchData(path: string, docId: string, doc: any, update = false): BatchDataModel {
    return {
        path,
        doc,
        docId,
        update
    };
}
