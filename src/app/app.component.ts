import { Component } from '@angular/core';

import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fala';
  readMode: 'rtl' | 'ltr' | 'btt' = 'rtl'; // {btt = bottom to top}

  constructor (
    public appSvc: AppService
  ) {
  }
}
