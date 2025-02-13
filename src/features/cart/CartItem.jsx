import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateQuantityItem from "./UpdateQuantityItem";




function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li id={pizzaId} className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantityItem pizzaId={pizzaId} quantity={quantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
