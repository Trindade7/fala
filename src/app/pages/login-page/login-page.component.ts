import { Component, OnInit } from '@angular/core';

import { AuthPageService } from './auth-page.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor (
    public authPageSvc: AuthPageService
  ) { }

  ngOnInit(): void { }

}
