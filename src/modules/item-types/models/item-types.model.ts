export class ItemTypes {
    [key: string]: string | number;
    id: number = 0;
    code: number = 0;
    name: string = '';

    /**
     * Getter and setters
    */

    static getForProduct(){
        return 1;
    }

    static getForService(){
        return 2;
    }
}