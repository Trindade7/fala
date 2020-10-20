import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';

import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor (
    private authService: AuthService,
    private router: Router,
    public chatService: ChatService,
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout().then(
      () => this.router.navigate(['login'])
    ).catch(
      err => {
        console.groupCollapsed('!ERROR in >login-page.component [emailAndPasswordSignIn]');
        console.log(err);
        console.groupEnd();
      }
    );
  }
}
