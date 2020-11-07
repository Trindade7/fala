import { FileUploader } from './upload-task.model';
import { User } from './user.model';

export type RequireOne<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] }
    & { [P in K]-?: T[P] };


export type FileGroup = 'audio' | 'image' | 'video' | 'doc' | 'book' | 'calc' | 'other';

const _mediaTypes = ['audio', 'image', 'video'];
const _typeGroups: any = {
    media: ['audio', 'image', 'video'],
    doc: ['doc', 'docx', 'txt', 'plain', 'document'],
    calc: ['xlsx', 'xls', 'csv', 'sheet'],
    book: ['pdf', 'epub', 'book'],
};

export function extractFileType(fullType: string): string {
    const fileTypeGroup = fullType.split('/')[0];
    const type = fullType.split('/')[1];

    return _mediaTypes.includes(fileTypeGroup) ? fileTypeGroup : type;
}

export function getFileTypeGroup(fileType: string, typeGroups: any = _typeGroups): FileGroup {
    typeGroups = _typeGroups; // * only passed as param functional rasons

    if (_typeGroups.media.includes(fileType)) {
        return fileType as FileGroup;
    }

    if (_typeGroups.doc.includes(fileType)) {
        return 'doc';
    }

    if (_typeGroups.calc.includes(fileType)) {
        return 'calc';
    }

    if (_typeGroups.book.includes(fileType)) {
        return 'book';
    }

    return 'other';
}




export class ConversationModel {
    id: string | null;
    name: string | null;
    users: Partial<User>[] | null;
    lastMessage: MessageModel | null;
    createdAt: Date | null;

    constructor (args: ConversationModel) {
        this.id = args.id;
        this.name = args.name;
        this.users = args.users;
        this.lastMessage = args.lastMessage;
        this.createdAt = args.createdAt;
    }

    static get empty(): ConversationModel {
        return {
            id: '',
            name: '',
            users: [],
            lastMessage: MessageModel.empty,
            createdAt: null,
        };
    }
}

export interface MessageFile {
    url: string;
    type: string;
}
export class MessageModel {
    id: string;
    senderId: string | null;
    messageBody: string | null;
    delivered: boolean | null;
    createdAt: Date | null;
    file: MessageFile | null;
    uploadTask?: FileUploader;


    constructor (args: RequireOne<MessageModel, 'id'>) {
        this.id = args.id;
        this.senderId = args.senderId ?? null;
        this.messageBody = args.messageBody ?? null;
        this.delivered = args.delivered ?? false;
        this.createdAt = args.createdAt ?? null;
        this.file = args.file ?? null;
        // * uploadTask won't be stored on server = can be undefined
        this.uploadTask = args.uploadTask ?? undefined;
    }

    static get empty(): MessageModel {
        return {
            id: '',
            senderId: null,
            messageBody: '',
            delivered: false,
            createdAt: null,
            file: null,
            uploadTask: undefined
        };
    }
}
