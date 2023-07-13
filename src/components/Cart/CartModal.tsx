import React, { useContext, useMemo } from "react";
import CartContext from "../../stores/cart-context";
import CartItem from "./CartItem";
import Modal from "../Core/Modal";
import Button from "../Core/Button";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

interface CartModalProps {
  onCloseModal: () => void;
}

const CartModal: React.FC<CartModalProps> = ({onCloseModal}) => {
  const cartCtx = useContext(CartContext);

  const calculatePrice = () => {
    if (cartCtx.entries.length === 0) return 0;

    return cartCtx.entries.reduce((accumulator, currentEntry) => {
      return accumulator + currentEntry.amount * currentEntry.product.price;
    }, 0);
  };
  const price = useMemo(calculatePrice, [cartCtx.entries]);

  return (
    <Modal className="w-3/4 max-w-3xl">
      <div>
        {cartCtx.entries.length === 0 && <p>No entries currently in the cart.</p>}
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
        <span className="texl-2xl font-bold">
          {priceFormatter.format(price)}
        </span>
      </div>
      <div className="float-right space-x-4">
        <Button
          onClick={onCloseModal}
          type="button"
          className="text-price-color border-2 border-price-color py-2 bg-white"
        >
          Close
        </Button>
        {cartCtx.entries.length !== 0 && (
          <Button className="bg-price-color py-2">Order</Button>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
