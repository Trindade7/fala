import { UserModel } from './user.model';

export class ConversationModel {
    id: string;
    name: string;
    users: Partial<UserModel>[];
    lastMessage: MessageModel;
    createdAt: Date;

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

export class MessageModel {
    id: string;
    senderId: string;
    messageBody: string;
    delivered: boolean;
    createdAt: Date;

    constructor (args: MessageModel) {
        this.id = args.id ?? null;
        this.senderId = args.senderId ?? null;
        this.messageBody = args.messageBody ?? null;
        this.delivered = args.delivered ?? false;
        this.createdAt = args.createdAt ?? null;
    }

    static get empty(): MessageModel {
        return {
            id: '',
            senderId: null,
            messageBody: 'Loading...',
            delivered: false,
            createdAt: null,
        };
    }
}
