import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-is-loading',
  templateUrl: './page-is-loading.component.html',
  styleUrls: ['./page-is-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageIsLoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
