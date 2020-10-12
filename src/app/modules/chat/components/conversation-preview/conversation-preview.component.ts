import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from 'src/app/core/models/conversation.model';

@Component({
  selector: 'app-conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPreviewComponent implements OnInit {
  @Input() conversation: ConversationModel = {
    name: 'Mollit minim, et sit adipisicing, velit dolor quis, nisi consectetur',
    id: null,
    createdAt: null,
    users: [
      {
        email: '',
        photoUrl: null
      }
    ],
    lastMessage: {
      conversationId: '',
      id: '',
      createdAt: null,
      delivered: null,
      sender: null,
      messageBody: `Dolor qui fugiat labore duis labore duis sint incididunt magna.
      Sunt dolor dolore consequat laborum. Veniam
      quis sunt amet nisi aliquip elit laborum sunt cillum nisi laborum
      esse. Reprehenderit veniam commodo
      adipisicing velit eiusmod ea nulla. Aute proident laboris eiusmod
      mollit do aliqua ea cupidatat. Commodo
      duis officia dolor proident dolor cupidatat proident labore Lorem.
      Nulla exercitation Lorem minim id ipsum
      nostrud anim veniam sunt velit anim quis consectetur dolore.`
    }
  };

  constructor () { }

  ngOnInit(): void {
  }

}
