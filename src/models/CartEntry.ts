import Product from "./Product";

class CartEntry {
    item: Product;
    amount: number;

    constructor (item: Product, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}

export default CartEntry;