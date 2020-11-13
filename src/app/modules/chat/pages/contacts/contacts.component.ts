import { Component, OnInit } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { emptyUser, User } from '@app/core/models/user.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ContactsService } from '../../services/contacts/contacts.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ContactInfo {
  name: string;
  position: string;
  email: string;
  phone: string;
  photoUrl: string;
}

const USER_DATA: ContactInfo[] = [
  { position: '1', name: 'Hydrogen', phone: '1.0079', photoUrl: 'some photo', email: 'H' },
  { position: '2', name: 'Helium', phone: '4.0026', photoUrl: 'some photo', email: 'He' },
  { position: '3', name: 'Lithium', phone: '6.941', photoUrl: 'some photo', email: 'Li' },
  { position: '4', name: 'Beryllium', phone: '9.0122', photoUrl: 'some photo', email: 'Be' },
  { position: '5', name: 'Boron', phone: '10.811', photoUrl: 'some photo', email: 'B' },
  { position: '6', name: 'Carbon', phone: '12.0107', photoUrl: 'some photo', email: 'C' },
  { position: '7', name: 'Nitrogen', phone: '14.0067', photoUrl: 'some photo', email: 'N' },
  { position: '8', name: 'Oxygen', phone: '15.9994', photoUrl: 'some photo', email: 'O' },
  { position: '9', name: 'Fluorine', phone: '18.9984', photoUrl: 'some photo', email: 'F' },
  { position: '10', name: 'Neon', phone: '20.1797', photoUrl: 'some photo', email: 'Ne' },
];

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
  dataSource: User[] = [];

  hideContactDetails = false;

  selectedContact: User = emptyUser();

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

  set selectContact(contact: User) {
    this.selectedContact = contact;
    this.hideContactDetails = false;
  }
}
