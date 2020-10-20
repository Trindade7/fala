import { Injectable } from '@angular/core';

import { FireauthService } from '../firebase/fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends FireauthService { }
