import { Injectable } from '@angular/core';
import { MessageModel } from '@app-core/models/conversation.model';
import { DbFacade } from '@app-core/services/db.facade';

@Injectable({
    providedIn: 'root'
})
export class MessagesDb extends DbFacade<MessageModel>{
    basePath = 'conversations';
}
