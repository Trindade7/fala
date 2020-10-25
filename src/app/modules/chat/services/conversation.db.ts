import { Injectable } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { DbFacade } from '@app-core/services/db.facade';

@Injectable({
    providedIn: 'root'
})
export class ConversationDb extends DbFacade<ConversationModel>{
    basePath = 'conversations';
}
