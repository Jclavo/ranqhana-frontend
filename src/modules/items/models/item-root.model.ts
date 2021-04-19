import { Item } from "./item.model";

export class ItemRoot {
    id: number = 0;
    item_id: number = 0;
    root_id: number = 0;
    amount: number = 0;

    item = new Item();
}