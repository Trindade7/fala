// import { Injectable } from '@angular/core';
// import { MessageModel } from '@app-core/models/conversation.model';
// import { StoreGeneric } from '@app-core/services/store.generic';

// interface IViewConversationPage {
//     messages: MessageModel[],
//     loading: boolean,
//     status: string,
//     error: Error;
// }


// @Injectable({
//     providedIn: 'root'
// })
// export class ViewConversationStore extends StoreGeneric<IViewConversationPage>{
//     protected store = 'conversations-store';

//     constructor () {
//         super({
//             loading: true,
//             messages: []
//         });
//     }

// }