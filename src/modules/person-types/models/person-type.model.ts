export class PersonType {
    id: number = 0;
    name: string = '';

    static getForNatural(){
        return 1;
    }

    static getForJuridical(){
        return 2;
    }
}