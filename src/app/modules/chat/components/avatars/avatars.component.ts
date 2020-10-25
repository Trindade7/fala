import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@app/core/models/user.model';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarsComponent implements OnInit {
  @Input() users: UserModel[];
  @Input() currentUserId: string;

  constructor () { }

  ngOnInit(): void {
  }

}
