import { Injectable } from '@angular/core';
import { ConversationModel } from 'src/app/core/models/conversation.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DbFacade } from 'src/app/core/services/db.facade';

@Injectable({
    providedIn: 'root'
})
export class ConversationsDb extends DbFacade<ConversationModel>{
    basePath = 'conversations';

    constructor (private authService: AuthService) {
        super();

        this.basePath = `conversations/${this.authService.uid}`;
    }
}