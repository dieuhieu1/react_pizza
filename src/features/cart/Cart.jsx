import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const userName = useSelector((state) => state.user.username);
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  if (!cart.length) {
    return <EmptyCart/>;
  }
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">&larr; Back to menu</Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
    <ul className="mt-3 divide-y divide-stone-300 border-b border-stone-300">
      {cart.map(item => <CartItem item={item} key={item.pizzaId}/>
      )}
    </ul>
      <div className="mt-6 sapce-x-2">
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
