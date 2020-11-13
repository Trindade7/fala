import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { DbGenericService } from '../db.genric.service';

@Injectable({
    providedIn: 'root'
})
export class UserDb extends DbGenericService<User>{
    basePath = 'users';
}