import React, { useContext } from "react";
import CartContext from "../../stores/cart-context";
import CartItem from "./CartItem";
import Button from "../Core/Button";

interface CartEntriesProps {
  totalPrice: string;
  onCloseModal: () => void;
  onChangePage: () => void;
}

const CartEntries: React.FC<CartEntriesProps> = ({
  totalPrice,
  onCloseModal,
  onChangePage,
}) => {
  const cartCtx = useContext(CartContext);

  return (
    <div>
      <div>
        {cartCtx.entries.length === 0 && (
          <p>No entries currently in the cart.</p>
        )}
        {cartCtx?.entries.map((entry) => (
          <CartItem
            key={entry.product.id}
            item={entry.product}
            amount={entry.amount}
            onAddItem={() => {
              cartCtx.addToCart(entry.product);
            }}
            onRemoveItem={() => {
              cartCtx.removeFromCart(entry.product);
            }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <span className="text-2xl font-bold">Total Amount</span>
        <span className="texl-2xl font-bold">{totalPrice}</span>
      </div>
      <div className="float-right space-x-4">
        <Button
          onClick={onCloseModal}
          type="button"
          className="text-price-color border-2 border-price-color py-2 bg-white"
        >
          <span className="hover:border-b-2 border-price-color transition duration-500">
            Close
          </span>
        </Button>
        {cartCtx.entries.length !== 0 && (
          <Button className="bg-price-color py-2" onClick={onChangePage}>
            Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartEntries;
