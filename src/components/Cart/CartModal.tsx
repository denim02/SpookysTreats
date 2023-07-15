import React, { useState, useContext, useMemo } from "react";
import Modal from "../Core/Modal";
import CartEntries from "./CartEntries";
import OrderForm from "./OrderForm";
import CartContext from "../../stores/cart-context";
import { CSSTransition } from "react-transition-group";

interface CartModalProps {
  onCloseModal: () => void;
}

type VisiblePageState = "CartEntries" | "OrderForm";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const CartModal: React.FC<CartModalProps> = ({ onCloseModal }) => {
  const [visiblePage, setVisiblePage] =
    useState<VisiblePageState>("CartEntries");

  const changeVisiblePageHandler = () => {
    if (visiblePage == "CartEntries") setVisiblePage("OrderForm");
    else setVisiblePage("CartEntries");
  };

  const cartCtx = useContext(CartContext);
  const { entries } = cartCtx;

  const calculatePrice = () => {
    if (entries.length === 0) return 0;

    return entries.reduce((accumulator, currentEntry) => {
      return accumulator + currentEntry.amount * currentEntry.product.price;
    }, 0);
  };
  const totalPrice = useMemo(calculatePrice, [entries]);
  const totalPriceString = priceFormatter.format(totalPrice);

  return (
    <Modal className="w-3/4 max-w-3xl overflow-hidden">
      <CSSTransition
        in={visiblePage === "CartEntries"}
        timeout={300}
        classNames="entries-page"
        mountOnEnter
        unmountOnExit
      >
        <CartEntries
          totalPrice={totalPriceString}
          onCloseModal={onCloseModal}
          onChangePage={changeVisiblePageHandler}
        />
      </CSSTransition>
      <CSSTransition
        in={visiblePage === "OrderForm"}
        timeout={300}
        classNames="order-page"
        mountOnEnter
        unmountOnExit
      >
        <OrderForm
          totalPrice={totalPriceString}
          onChangePage={changeVisiblePageHandler}
        />
      </CSSTransition>
    </Modal>
  );
};

export default CartModal;
