import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Logger as logger } from '@app-core/helpers/logger';
import { MessageModel } from '@app/core/models/conversation.model';
import { AuthService } from '@app/core/services/auth/auth.service';

import { UploadFilesComponent } from '../../../components/upload-files/upload-files.component';
import { ViewConversationService } from '../view-conversation.service';

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

  constructor (
    public auth: AuthService,
    public conversationSvc: ViewConversationService,
    private _fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void { }

  openBottomSheet(): void {
    this._bottomSheet.open(UploadFilesComponent);
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
      message.senderId = this.auth.uid;

      this.messageForm.reset('');

      this.conversationSvc.sendMessage(message).then(
        () => {
          logger.collapsed('sent');
        }
      ).catch(
        err => logger.collapsed(err.code, [err.message])
      );
    } else {
      logger.collapsed('Message can NOT be empty', []);
    }
  }
}
