import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '@app-envs/environment';
import { MessageModel } from '@app/core/models/conversation.model';
import { take } from 'rxjs/operators';

import { ChatService } from '../../services/chat/chat.service';
import { ViewConversationService } from '../../services/view-conversation/view-conversation.service';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrls: ['./view-conversation.component.scss']
})
export class ViewConversationComponent implements OnInit {
  @Output() closeConversationEmitter = new EventEmitter<boolean>();

  messageForm = this.fb.group({
    messageBody: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]
    ],
  });

  constructor (
    public chatService: ChatService,
    public conversationService: ViewConversationService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void { }

  closeConversation(): void {
    this.chatService.appSettings.toggleSideNav(false);
  }

  sendMessage(): void {
    console.log(this.messageForm);
    if (this.messageForm.valid) {
      const message = MessageModel.empty;
      message.messageBody = this.messageForm.value['messageBody'];
      this.chatService.currentUser$.pipe(
        take(1)
      ).toPromise().then(
        user => message.senderId = user.uid
      ).then(
        () => this.conversationService.sendMessage(message).then(
          () => {
            this.messageForm.reset();
          }
        ).catch(
          err => {
            this.chatService.openSnackBar(`Error the message: ${err.code}`);
            if (environment.production === false) {
              console.groupCollapsed(err.code);
              console.log(err.message);
              console.groupEnd();
            }
          }
        )
      );
    } else {
      this.chatService.openSnackBar(`Message can NOT be empty`);
    }
  }
}
