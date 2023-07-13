import Product from "./Product";

class CartEntry {
    product: Product;
    amount: number;

    constructor (product: Product, amount: number) {
        this.product = product;
        this.amount = amount;
    }
}

export default CartEntry;