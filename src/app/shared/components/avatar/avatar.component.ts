import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  @Input() imageUrl!: string;
  @Input() size: 'lg' | 'md' | 'sm' | 'xsm' = 'md';



  constructor () { }

  ngOnInit(): void {
    // this.imageUrl = this.imageUrl ?? 'https://placehold.it/100x100?text=user%20avatar';
    this.imageUrl = this.imageUrl ?? 'assets/images/placeholders/placeholder.png';
  }

}
