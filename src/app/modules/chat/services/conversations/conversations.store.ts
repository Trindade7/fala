import { Injectable } from '@angular/core';
import { ConversationModel } from 'src/app/core/models/conversation.model';
import { StoreGeneric } from 'src/app/core/services/store.generic';

interface IConversationsPage {
    conversations: ConversationModel[],
    loading: boolean,
    status: string,
    error: Error;
}


@Injectable({
    providedIn: 'root'
})
export class ConversationsStore extends StoreGeneric<IConversationsPage>{
    protected store = 'conversations-store';

    constructor () {
        super({
            loading: true,
            conversations: [],
        });
    }

}