import { UserModel } from '../../models/user.model';
import { StoreGeneric } from '../store.generic';

interface IUserStore {
    user: UserModel;
    loading: boolean;
    status: string;
    error: Error;
}

export class UserStore extends StoreGeneric<IUserStore> {
    protected store = "user";

    constructor () {
        super(
            {
                loading: true,
                status: '',
                user: UserModel.empty,
            }
        );
    }
}