import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ContactsService } from '../../services/contacts/contacts.service';

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContactComponent implements OnInit {

  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
  }

}
