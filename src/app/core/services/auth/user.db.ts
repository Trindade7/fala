import { Injectable } from '@angular/core';

import { UserModel } from '../../models/user.model';
import { DbGenericService } from '../db.genric.service';

@Injectable({
    providedIn: 'root'
})
export class UserDb extends DbGenericService<UserModel>{
    basePath = 'users';
}