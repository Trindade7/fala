import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component..html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fala';
  readMode: 'rtl' | 'ltr' | 'btt' = 'btt'; // {btt = bottom to top}

  constructor () {

  }
}
