import { Image } from "@modules/utility/models";
import { ItemRoot } from "./item-root.model";
import { ItemTag } from "./item-tag.model";

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
    isContainer: boolean = false;
    store_id: number = 0;
    barcode: string = '';
    created_at: string = '';
    updated_at: string = '';

    stock_types: Array<number | string> = [];
    type_id: number = 0;
    images: Array<Image> = [];

    //extra fields
    quantity: number = 0;

    roots: Array<ItemRoot> = [];

    tag_id: number = ItemTag.getForItem();
    // amount: number = 0;
}