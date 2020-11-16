
export interface UserModel {
    uid: string;
    name: string;
    email: string;
    isVerified?: boolean;
    phoneNumber?: string;
    photoUrl?: string;
}


export function createUser({
    uid,
    name,
    email,
    isVerified,
    phoneNumber,
    photoUrl
}: UserModel): UserModel {
    return {
        uid,
        name,
        email,
        isVerified: isVerified ?? false,
        phoneNumber: phoneNumber ?? '',
        photoUrl: photoUrl ?? '',
    };
}
export function emptyUser(): UserModel {
    return {
        uid: '',
        name: '',
        email: '',
        isVerified: false,
        phoneNumber: '',
        photoUrl: '',
    };
}
