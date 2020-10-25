import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorLogger } from '@app/core/helpers/error-log';
import { MessageModel } from '@app/core/models/conversation.model';
import { AuthService } from '@app/core/services/auth/auth.service';
import { take } from 'rxjs/operators';

import { ViewConversationService } from '../../services/view-conversation/view-conversation.service';

@Component({
  selector: 'app-new-meesage-bar',
  templateUrl: './new-meesage-bar.component.html',
  styleUrls: ['./new-meesage-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMeesageBarComponent implements OnInit {
  messageForm = this._fb.group({
    messageBody: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]
    ],
  });

  errorLogger = new ErrorLogger();

  constructor (
    public auth: AuthService,
    public conversationSvc: ViewConversationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void { }

  @HostListener('dragover', ['$event'])
  onDragOver($event: any): void {
    $event.preventDefault();
    console.log('HOVERED');
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave($event: any): void {
    $event.preventDefault();
    console.log('HOVER LEFT');
  }

  sendMessage(): void {
    console.log(this.messageForm);
    const messageBody: string = this.messageForm.value.messageBody;

    if (
      this.messageForm.valid
      && messageBody.trim().length
    ) {
      const message = MessageModel.empty;
      message.messageBody = messageBody;

      this.auth.user$.pipe(
        take(1)
      ).toPromise().then(
        user => message.senderId = user.uid
      ).then(
        () => this.conversationSvc.sendMessage(message).then(
          () => {
            this.messageForm.reset();
          }
        ).catch(
          err => {
            this.errorLogger.collapsed(err.code, [err.message]);
          }
        )
      );
    } else {
      this.errorLogger.collapsed('Message can NOT be empty', []);
    }
  }
}
