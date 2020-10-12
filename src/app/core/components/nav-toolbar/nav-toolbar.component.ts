import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavToolbarComponent implements OnInit {

  constructor (public authService: AuthService) { }

  ngOnInit(): void {
  }

}
