import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarsComponent implements OnInit {
  @Input() imageUrl = '';

  constructor () { }

  ngOnInit(): void {
  }

}
