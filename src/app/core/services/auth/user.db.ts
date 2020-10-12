import { Injectable } from '@angular/core';

import { UserModel } from '../../models/user.model';
import { DbFacade } from '../db.facade';

@Injectable({
    providedIn: 'root'
})
export class UserDb extends DbFacade<UserModel>{
    basePath = 'users';
}