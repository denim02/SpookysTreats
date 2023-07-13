import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Product from "../../models/Product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

interface CartItemProps {
  item: Product,
  amount: number,
  onAddItem: () => void,
  onRemoveItem: () => void
}

const CartItem: React.FC<CartItemProps> = ({ item, amount, onAddItem, onRemoveItem }) => {
  return (
    <div
      key={item.id}
      className="flex pb-4 pt-6 justify-between items-center border-b-4 border-price-color"
    >
      <div className="">
        <p className="font-bold text-2xl mb-3">{item.name}</p>
        <span className="font-bold text-lg text-price-color">
          {priceFormatter.format(item.price)}
        </span>
        <span className="ml-14 font-bold text-lg border-2 rounded-md px-3 py-px border-gray-400">{`x ${amount}`}</span>
      </div>
      <div className="space-x-4">
        <button
          type="button"
          className="text-price-color ring-2 ring-price-color/50 px-4 text-base rounded-md"
          onClick={onRemoveItem}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          type="button"
          className="text-price-color ring-2 ring-price-color/50 px-4 text-base rounded-md"
          onClick={onAddItem}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
