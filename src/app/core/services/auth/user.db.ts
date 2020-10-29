import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { DbFacade } from '../db.facade';

@Injectable({
    providedIn: 'root'
})
export class UserDb extends DbFacade<User>{
    basePath = 'users';
}