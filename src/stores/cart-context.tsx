import React, { PropsWithChildren, useState } from "react";
import Product from "../models/Product";
import CartEntry from "../models/CartEntry";

interface CartContextType {
    items: CartEntry[],
    addToCart: (item: Product, amountToAdd: number ) => void,
    removeFromCart: (item: Product) => void
}

const CartContext = React.createContext<CartContextType>({} as CartContextType);

const CartContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [items, setItems] = useState<CartEntry[]>([]);

  const addToCart = (item: Product, amountToAdd = 1) => {
    setItems((prevState) => {
      // Check if empty
      if (items.length === 0)
        return [
          new CartEntry(item, amountToAdd)
        ];

      // Copy state array to modify the amount of the element
      const copyPrevState = [...prevState];

      // Check if ID is already in the array
      const index = copyPrevState.findIndex(
        (element) => element.item.id === item.id
      );

      if (index >= 0) {
        copyPrevState[index].amount += amountToAdd;
        return copyPrevState;
      } else {
        return [
          ...prevState,
          new CartEntry(item, amountToAdd)
        ];
      }
    });
  };

  const removeFromCart = (item: Product) => {
    setItems((prevState) => {
      if (items.length === 0) return [];

      const index = prevState.findIndex(
        (element) => element.item.id === item.id
      );
      const copyPrevState = [...prevState];

      if (prevState[index].amount === 1) {
        copyPrevState.splice(index, 1);
      } else {
        copyPrevState[index].amount -= 1;
      }

      return copyPrevState;
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: items,
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
