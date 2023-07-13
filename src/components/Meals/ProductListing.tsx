import React, { useContext, useRef } from "react";
import CartContext from "../../stores/cart-context";
import Button from "../Core/Button";
import Product from "../../models/Product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

interface ProductListingProps {
  product: Product
}

const ProductListing: React.FC<ProductListingProps> = ({ product }) => {
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const addProductHandler = (product: Product) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const amountToAdd = +amountInputRef.current!.value;

      cartCtx.addToCart(product, amountToAdd);
    };
  };

  return (
    <li className="flex justify-between products-center py-6 border-b-4 border-gray-100">
      <div className="space-y-px">
        <h3 className="font-bold">{product.name}</h3>
        <p className="italic">{product.description}</p>
        <p className="text-price-color font-bold">
          {priceFormatter.format(product.price)}
        </p>
      </div>
      <form onSubmit={addProductHandler(product)}>
        <div className="mb-2">
          <label
            htmlFor={`${product.name.toLowerCase()}-amount`}
            className="font-bold"
          >
            Amount
          </label>
          <input
            type="number"
            name={`${product.name.toLowerCase()}-amount`}
            id={`${product.name.toLowerCase()}-amount`}
            min="1"
            defaultValue="1"
            ref={amountInputRef}
            className="border rounded-md w-14 ml-3 pl-2"
          />
        </div>
        <Button type="submit" className="float-right">
          +<span className="ml-2">Add</span>
        </Button>
      </form>
    </li>
  );
};

export default ProductListing;
