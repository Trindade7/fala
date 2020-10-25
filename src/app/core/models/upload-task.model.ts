import { Observable } from 'rxjs';

export type FileData = {
    path: string,
    type: string;
    file: File;
};

export type FileUploader = {
    data: FileData;
    percentageChanges: Observable<number | undefined>;
    cancel(): boolean;
    pause(): boolean;
    resume(): boolean;
};