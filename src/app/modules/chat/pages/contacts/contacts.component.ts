import { Component, OnInit } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { emptyUser, UserModel } from '@app/core/models/user.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ContactsService } from '../../services/contacts/contacts.service';

const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];


@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  letters = LETTERS;

  displayedColumns: string[] = [
    'photoUrl',
    'name',
    'phoneNumber',
    'email',
  ];

  columnNames: string[] = [
    'Image',
    'name',
    'Phone',
    'email',
  ];
  // dataSource = USER_DATA;
  dataSource: UserModel[] = [];

  hideContactDetails = false;

  selectedContact: UserModel = emptyUser();

  constructor (
    public contactsSvc: ContactsService
  ) { }

  ngOnInit(): void {
    this.contactsSvc.collection$.pipe(
      catchError(
        err => {
          logger.collapsed('[contacts.component] Error subscribing', [err]);
          return of([]);
        }
      )
    ).subscribe(users => this.dataSource = users);
  }

  toggleContactDetails(): void {
    this.hideContactDetails = !this.hideContactDetails;
  }

  isActive(id: string): boolean {
    return this.selectedContact.uid === id ? true : false;
  }

  set selectContact(contact: UserModel) {
    this.selectedContact = contact;
    this.hideContactDetails = false;
  }
}
