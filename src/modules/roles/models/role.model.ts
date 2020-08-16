export class Role {
    [key: string]: string | number;
    id: number = 0;
    name: string = '';
    project_id: number = 0;

    /**
     * static setters
     */

    static getClientID(){
        return 4;
    }
    
}