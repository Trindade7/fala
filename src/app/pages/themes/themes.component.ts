import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  constructor () { }

  ngOnInit(): void {
    console.log('saved');
    console.log('not logging');
  }

  log(): void {
    console.error('not working');
  }
}
