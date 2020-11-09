import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { StoreGeneric } from '@app-core/services/store.generic';

export interface IChatPage {
    conversation?: ConversationModel;
    conversationNotStored?: boolean;
    messages: MessageModel[];
    files?: string[];
    links?: string[];
    loading: boolean;
    status: string;
    error: Error;
}

@Injectable({
    providedIn: 'root'
})
export class ChatStore extends StoreGeneric<IChatPage>{
    protected store = 'chat-store';
    // tslint:disable-next-line: variable-name
    appSettings = new AppSettings();

    constructor() {
        super({
            loading: true,
            messages: [],
            conversation: undefined,
            conversationNotStored: true,
            error: undefined,
            files: undefined,
            status: undefined,
            links: undefined
        });
    }
}

export class AppSettings {
    // tslint:disable-next-line: variable-name
    private _readMode: 'rtl' | 'ltr' = 'ltr';
    // tslint:disable-next-line: variable-name
    private _openSideNav = true;

    get readMode(): 'rtl' | 'ltr' { return this._readMode; }
    get openSideNav(): boolean { return this._openSideNav; }

    toggleSideNav(val?: boolean): void {
        this._openSideNav = val ?? !this._openSideNav;
    }

    toggleReadMode(): void {
        this._readMode = this._readMode === 'rtl' ? 'ltr' : 'rtl';
    }
}
