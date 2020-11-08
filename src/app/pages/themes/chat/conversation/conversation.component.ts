import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConversationModel } from '@app/core/models/conversation.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit {
  @Input() conversationI!: ConversationModel;

  conversation = {
    name: 'coonversation Name',
    body: `Nostrud labore Lorem do mollit ipsum ullamco proident
    excepteur labore Lorem pariatur excepteur magna. Pariatur
    occaecat dolore sint occaecat laborum enim irure eu incididunt
    sit veniam. Magna consectetur esse anim reprehenderit deserunt.
    Nisi consectetur elit nostrud adipisicing qui Lorem nostrud. `
  };

  constructor () { }

  ngOnInit(): void {
  }

}
