export class UserModel {
    uid: string;
    name: string;
    email: string;
    isVerified: boolean;
    phoneNumber: string;
    photoUrl: string;

    constructor ({
        uid,
        name,
        email,
        isVerified,
        phoneNumber,
        photoUrl
    }: UserModel) {
        return {
            uid,
            name,
            email,
            isVerified,
            phoneNumber,
            photoUrl
        };
    }

    static empty(): UserModel {
        return {
            uid: '',
            name: '',
            email: '',
            isVerified: false,
            phoneNumber: '',
            photoUrl: ''
        };
    }
}