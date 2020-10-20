import { Injectable } from '@angular/core';
import { ConversationModel, MessageModel } from '@app-core/models/conversation.model';
import { StoreGeneric } from '@app-core/services/store.generic';

export interface IChatPage {
    conversation: ConversationModel;
    messages: MessageModel[];
    files?: string[];
    links?: string[];
    loading: boolean;
    status: string;
    error: Error;
}

// tslint:disable-next-line: class-name
// interface _AppSettings {
//     readMode: 'rtl' | 'ltr';
//     openSideNav: boolean;
// }
// export interface AppSettings {
//     readMode: Readonly<'rtl' | 'ltr'>;
//     openSideNav: Readonly<boolean>;
//     toggleSideNav: () => void;
//     toggleReadMode: () => void;
// }


@Injectable({
    providedIn: 'root'
})
export class ChatStore extends StoreGeneric<IChatPage>{
    protected store = 'chat-store';
    // tslint:disable-next-line: variable-name

    temp: MessageModel[] = [
        {
            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `
Laboris aute exercitation nostrud nulla magna anim eu nulla sint.
Commodo occaecat exercitation sint do qui quis excepteur. Aliquip
aliqua aliqua ut commodo. Velit qui ad non enim proident non labore irure velit.
`

        },
        {
            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `Dolor qui fugiat labore duis labore duis sint incididunt magna.
              Sunt dolor dolore consequat laborum. Veniam
              quis sunt amet nisi aliquip elit laborum sunt cillum nisi laborum
              esse. Reprehenderit veniam commodo
              adipisicing velit eiusmod ea nulla. Aute proident laboris eiusmod
              mollit do aliqua ea cupidatat. Commodo
              duis officia dolor proident dolor cupidatat proident labore Lorem.
              Nulla exercitation Lorem minim id ipsum
              nostrud anim veniam sunt velit anim quis consectetur dolore.`

        },
        {

            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `Dolore id mollit nulla ad magna laborum ex consequat eu.
                 Ullamco cillum esse velit ex. Occaecat irure ea adipisicing tempor
                  nulla cillum irure do deserunt ipsum qui sit do. Anim aliquip consequat
                   id veniam occaecat veniam ad sit nostrud incididunt anim ex cupidatat.`

        },
        {
            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `Sint anim anim minim amet esse deserunt minim est eiusmod magna. Labore commodo in duis quis occaecat duis Lorem exercitation do nulla aliqua ipsum ex quis. Enim qui consequat ea cillum tempor. Dolore anim labore ex in cillum sint aliquip cupidatat laborum veniam est eiusmod. Aliquip aute elit exercitation ad nostrud exercitation mollit ea. In ea et Lorem nulla culpa velit cupidatat voluptate elit adipisicing.`

        },
        {
            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `
                Eiusmod consectetur veniam deserunt aute velit deserunt esse id consectetur deserunt anim aute veniam. Reprehenderit non in ipsum eiusmod ex id. Aliquip laborum quis dolore irure mollit est voluptate consectetur cupidatat cillum. Et occaecat duis nostrud voluptate qui minim quis. Culpa minim id laborum pariatur. Magna mollit sunt anim et do incididunt duis cupidatat quis sit.
                `

        },

        {

            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `Dolore id mollit nulla ad magna laborum ex consequat eu.
                 Ullamco cillum esse velit ex. Occaecat irure ea adipisicing tempor
                  nulla cillum irure do deserunt ipsum qui sit do. Anim aliquip consequat
                   id veniam occaecat veniam ad sit nostrud incididunt anim ex cupidatat.`

        },
        {
            conversationId: '',
            id: '',
            createdAt: null,
            delivered: null,
            senderId: null,
            messageBody: `Sint anim anim minim amet esse deserunt minim est eiusmod magna. Labore commodo in duis quis occaecat duis Lorem exercitation do nulla aliqua ipsum ex quis. Enim qui consequat ea cillum tempor. Dolore anim labore ex in cillum sint aliquip cupidatat laborum veniam est eiusmod. Aliquip aute elit exercitation ad nostrud exercitation mollit ea. In ea et Lorem nulla culpa velit cupidatat voluptate elit adipisicing.`

        },
    ];
    appSettings = new AppSettings();

    constructor () {
        super({
            loading: true,
            messages: [],
            conversation: null,
            error: null,
            files: null,
            status: null,
            links: null
        });
    }


}

export class AppSettings {
    // tslint:disable-next-line: variable-name
    private _readMode: 'rtl' | 'ltr' = 'ltr';
    // tslint:disable-next-line: variable-name
    private _openSideNav = true;

    constructor () {
    }

    get readMode(): 'rtl' | 'ltr' { return this._readMode; }
    get openSideNav(): boolean { return this._openSideNav; }

    toggleSideNav(val?: boolean): void {
        this._openSideNav = val ?? !this._openSideNav;
    }

    toggleReadMode(): void {
        this._readMode = this._readMode === 'rtl' ? 'ltr' : 'rtl';
    }
}