export class Image {

    public name: string;
    public image: File;
    public path: string;
    public fullPath: string;

    constructor(name: string, image: File, path: string, fullPath: string )
    {
        this.name = name;
        this.image = image;
        this.path = path;
        this.fullPath = fullPath;
    }

}