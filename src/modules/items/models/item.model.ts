import { Image } from "@modules/utility/models";

export class Item {
    // [key: string]: string | number | boolean;
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0.0;
    stock: number = 0;
    unit: string = '';
    unit_id: number = 0;
    fractioned: boolean = false; 
    stocked: boolean = true; 
    store_id: number = 0;
    created_at: string = ''; 
    updated_at: string = ''; 

    stock_types: Array<number|string> = [];
    type_id: number = 0;
    images: Array<Image> = [];
    
    //extra fields
    quantity: number = 0;


    /**
     * Getter and setters
     */
    static getTypeProduct(){
        return 1;
    }

    static getTypeService(){
        return 2;
    }

}