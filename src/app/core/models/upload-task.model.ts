import { Observable } from 'rxjs';

export const AcceptedFileTypesList = [
    'video/*',
    'image/*',
    'audio/*',
    'zip',
    'rar',
    'pdf',
    'doc',
    'docx',
];

const _AcceptedFileTypesList = [...AcceptedFileTypesList] as const;

export type AcceptedFileTypes = typeof _AcceptedFileTypesList[number];

export type FileData = {
    path: string,
    type: AcceptedFileTypes;
    file: File;
};

export type FileUploader = {
    data: FileData;
    percentageChanges: Observable<number | undefined>;
    cancel(): boolean;
    pause(): boolean;
    resume(): boolean;
};
