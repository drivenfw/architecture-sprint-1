
    export type RemoteKeys = 'gallery/GalleryTest';
    type PackageType<T> = T extends 'gallery/GalleryTest' ? typeof import('gallery/GalleryTest') :any;