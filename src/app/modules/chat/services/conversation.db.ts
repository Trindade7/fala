import { Injectable } from '@angular/core';
import { ConversationModel } from '@app-core/models/conversation.model';
import { DbGenericService } from '@app/core/services/db.genric.service';

@Injectable({
    providedIn: 'root'
})
export class ConversationDb extends DbGenericService<ConversationModel>{
    basePath = 'conversations';
}
