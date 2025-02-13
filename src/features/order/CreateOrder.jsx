import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant.js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice.js";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers.js";
import store from "../../utils/store.js"
import Button from "../../UI/Button.jsx";
import { getAddress } from "../../services/apiGeocoding.js";
import { fetchAddress, getLocation } from "../user/userSlice.js";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigate = useNavigation();

  const {username, address, position, error: errorAddress, status: addressStatus } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const priorityPrice = withPriority ? totalPrice * 0.2 :  0;
  const total = totalPrice + priorityPrice;

  const isLoadingAddress = addressStatus === "loading";
  const isSubmiting = navigate.state === "submitting";
  const formErrors = useActionData();
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-medium mb-2">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-2">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input grow" defaultValue={username}/>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full"/>
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md p-2 font-bold">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-2 relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full" defaultValue={address} disabled={isLoadingAddress}/>
            {addressStatus === "error" && <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md p-2 font-bold" >{errorAddress}</p>}
            { !position.longtitude && !position.latitude ? <span className="absolute right-[5px] top-[5px] ">
            <Button type="small" onClick={(e) => {
              e.preventDefault(); 
              dispatch(fetchAddress())}}
              >Get Position</Button>
              </span> : ""
            }
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <button disabled={isSubmiting} className="tracking-wide inline-block rounded-full px-4 py-3 text-xl font-semibold uppercase bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300 text-stone-800 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed">
            {isSubmiting ? "Placing Order..." : "Order now from " + formatCurrency(total)}
          </button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need this to contact you!";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
 
}
export default CreateOrder;
