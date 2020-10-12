import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { FireauthService } from '../firebase/fireauth.service';
import { AuthFacade } from './auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthFacade {
  constructor (
    private afs: FireauthService,
    private rtr: Router
  ) {
    super(afs, rtr);
  }

}
