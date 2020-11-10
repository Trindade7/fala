import { Component, OnInit } from '@angular/core';

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
    'phone',
    'email',
    'position',
  ];
  columnNames: string[] = [
    'Photo Url',
    'Name',
    'phone',
    'email',
    'position',
  ];
  dataSource = USER_DATA;



  constructor () { }

  ngOnInit(): void {
  }

}
