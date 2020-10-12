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

    static empty(): ConversationModel {
        return {
            id: '',
            name: '',
            users: [],
            lastMessage: null,
            createdAt: null,
        };
    }
}

export class MessageModel {
    id: string;
    conversationId: string;
    sender: UserModel;
    messageBody: String;
    delivered: boolean;
    createdAt: Date;

    constructor (args: MessageModel) {
        this.id = args.id ?? null;
        this.conversationId = args.conversationId ?? null;
        this.sender = args.sender ?? null;
        this.messageBody = args.messageBody ?? null;
        this.delivered = args.delivered ?? false;
        this.createdAt = args.createdAt ?? null;
    }

    static empty(): MessageModel {
        return {
            id: '',
            conversationId: '',
            sender: null,
            messageBody: '',
            delivered: false,
            createdAt: null,
        };
    }
}
