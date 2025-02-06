
    export type RemoteKeys = 'profile/ProfileTest';
    type PackageType<T> = T extends 'profile/ProfileTest' ? typeof import('profile/ProfileTest') :any;