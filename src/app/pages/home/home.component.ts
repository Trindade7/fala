import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserService } from '@app/core/services/auth/user.service';

interface HMSTime { h: number; m: number; s: number; }

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date = new Date();
  time = {
    h: this.date.getHours(),
    m: this.date.getMinutes(),
    s: this.date.getSeconds()
  };

  constructor (
    public userSvc: UserService,
    private _authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.startClock(this.time);
  }

  startClock(time: HMSTime): void {
    setInterval(() => {
      const today = new Date();
      time.h = today.getHours();
      time.m = today.getMinutes();
      time.s = today.getSeconds();
    }, 1000);
  }

  signOut(): void {
    this._authSvc.logout();
  }
}
