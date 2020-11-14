import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Logger as logger } from '@app-core/helpers/logger';
import { UserService } from '@app/core/services/auth/user.service';

import { SendFilesComponent } from '../send-files/send-files.component';
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
    public userSvc: UserService,
    public conversationSvc: ViewConversationService,
    private _fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void { }

  openBottomSheet(): void {
    this._bottomSheet.open(SendFilesComponent);
  }

  sendMessage(): void {
    console.log(this.messageForm);
    const messageBody: string = this.messageForm.value.messageBody;

    if (
      this.messageForm.valid
      && messageBody.trim().length
    ) {
      this.messageForm.reset('');

      this.conversationSvc.sendMessage(messageBody).then(
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
