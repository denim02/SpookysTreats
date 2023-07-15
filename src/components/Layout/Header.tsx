import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../stores/cart-context";
import React, { useContext, useMemo, useState } from "react";
import CartModal from "../Cart/CartModal";
import Button from "../Core/Button";
import { CSSTransition } from "react-transition-group";

const Header: React.FC = () => {
  const cartCtx = useContext(CartContext);
  const [isCartVisible, setCartVisible] = useState(false);

  const openModalHandler = () => {
    setCartVisible(true);
  };

  const closeModalHandler = () => {
    setCartVisible(false);
  };

  const { entries } = cartCtx;

  const calculateTotalProductCount = () => {
    if (entries) {
      return entries.reduce((accumulator, currentEntry) => {
        return accumulator + currentEntry.amount;
      }, 0);
    } else return 0;
  };

  const itemCount = useMemo(calculateTotalProductCount, [entries]);

  return (
    <>
      <div className="bg-header-color">
        <header className="flex justify-between items-center max-w-7xl mx-auto text-white py-4">
          <h1 className="text-3xl font-bold tracking-tight">Spooky's Treats</h1>
          <Button
            type="button"
            onClick={openModalHandler}
            className="bg-cart-button-color py-3"
          >
            <span className="font-bold text-sm mr-4">
              <FontAwesomeIcon
                icon={faCartShopping}
                color="white"
                className="mr-2"
              />
              Your Cart
            </span>
            <span className="bg-cart-count-color text-sm rounded-3xl px-4 py-1 text-center">
              {itemCount}
            </span>
          </Button>
        </header>
      </div>

      {/* Cart Modal (list of items) */}
      <CSSTransition
        in={isCartVisible}
        timeout={300}
        classNames="cart-modal"
        mountOnEnter
        unmountOnExit
        onEnter={() => {document.body.classList.add("modal-open")}}
        onExit={() => {document.body.classList.remove("modal-open")}}
      >
        <CartModal onCloseModal={closeModalHandler} />
      </CSSTransition>
    </>
  );
};

export default Header;
