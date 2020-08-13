export class Item {
    // [key: string]: string | number | boolean;
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
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
    
    //extra fields
    quantity: number = 0;


    /**
     * Getter and setters
     */
    setTypeProduct(){
        this.type_id = 1;
    }

    setTypeService(){
        this.type_id = 2;
    }

    getType(){
        return this.type_id;
    }

}