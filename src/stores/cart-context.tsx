import React, { PropsWithChildren, useState } from "react";
import Product from "../models/Product";
import CartEntry from "../models/CartEntry";

interface CartContextType {
  entries: CartEntry[];
  addToCart: (product: Product, amountToAdd?: number) => void;
  removeFromCart: (product: Product) => void;
}

const CartContext = React.createContext<CartContextType>({} as CartContextType);

const CartContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [entries, setEntries] = useState<CartEntry[]>([]);

  const addToCart = (product: Product, amountToAdd = 1) => {
    console.log("before setEntries called", amountToAdd);
    setEntries((prevState) => {
      console.log("called");

      // Check if empty
      if (entries.length === 0) return [new CartEntry(product, amountToAdd)];

      // Check if ID is already in the array
      const index = prevState.findIndex(
        (entry) => entry.product.id === product.id
      );

      if (index >= 0) {
        return prevState
          .filter((_, entryIndex) => entryIndex !== index)
          .concat(
            new CartEntry(
              prevState[index].product,
              prevState[index].amount + amountToAdd
            )
          );
      } else {
        return [...prevState, new CartEntry(product, amountToAdd)];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setEntries((prevState) => {
      if (entries.length === 0) return [];

      const index = prevState.findIndex(
        (entry) => entry.product.id === product.id
      );

      if (prevState[index].amount === 1) {
        return prevState.filter((_, entryIndex) => entryIndex !== index);
      } else {
        return prevState
          .filter((_, entryIndex) => entryIndex !== index)
          .concat(
            new CartEntry(prevState[index].product, prevState[index].amount - 1)
          );
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        entries: entries,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
export { CartContextProvider };
