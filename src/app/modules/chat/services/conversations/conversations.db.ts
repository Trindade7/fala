import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { DbFacade } from '@app-core/services/db.facade';

@Injectable({
    providedIn: 'root'
})
export class ConversationsDb extends DbFacade<ConversationModel | MessageModel>{
    basePath = 'conversations';
}
