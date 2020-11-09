import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MessageModel } from '@app/core/models/conversation.model';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input() received = false;
  @Input() message!: MessageModel;
  @Input() sender!: User;

  constructor() { }

  ngOnInit(): void {
  }

  getDate(dateStr: { seconds: number, milliseconds: number; }): number {
    // tslint:disable-next-line: no-string-literal
    return new Date(0).setUTCSeconds(dateStr.seconds);
  }

}
