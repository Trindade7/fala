import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
