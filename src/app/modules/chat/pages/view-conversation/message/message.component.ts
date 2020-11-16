import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageModel } from '@app/core/models/conversation.model';
import { UserModel } from '@app/core/models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input() received = false;
  @Input() message!: MessageModel;
  @Input() sender!: UserModel;

  @Output() senderIdEmitter: EventEmitter<string> = new EventEmitter();

  constructor () { }

  ngOnInit(): void {
  }

  getDate(dateStr: { seconds: number, milliseconds: number; }): number {
    // tslint:disable-next-line: no-string-literal
    if (!dateStr?.seconds) {
      return new Date(0).setUTCSeconds(-938649360);
    }
    return new Date(0).setUTCSeconds(dateStr.seconds);
  }

  emitSenderId() {
    this.senderIdEmitter.emit(this.sender.uid);
  }

}
