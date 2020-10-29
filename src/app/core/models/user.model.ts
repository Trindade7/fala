
export interface User {
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
}: User): User {
    return {
        uid,
        name,
        email,
        isVerified: isVerified ?? false,
        phoneNumber: phoneNumber ?? '',
        photoUrl: photoUrl ?? '',
    };
}
export function emptyUser(): User {
    return {
        uid: '',
        name: '',
        email: '',
        isVerified: false,
        phoneNumber: '',
        photoUrl: '',
    };
}
