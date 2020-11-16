import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@app/core/models/user.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
  @Input() avatarUrl!: string;
  @Input() contact!: UserModel;


  constructor () { }

  ngOnInit(): void {
  }

}
