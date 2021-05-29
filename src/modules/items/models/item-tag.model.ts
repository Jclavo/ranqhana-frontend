export class ItemTag {
    id: number = 0;
    name: string = ''; 

    static getForItem(){
        return 1;
    }
    static getForContainer(){
        return 2;
    }
    static getForDeal(){
        return 3;
    }

}