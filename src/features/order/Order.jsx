/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-xl">Order #{id} status</h2>

        <div className="flex gap-3 items-center uppercase  font-bold">
          {priority && <span className=" rounded-full bg-red-600 text-red-50  p-2">Priority</span>}
          <span className="bg-green-500 rounded-full p-2 text-green-50 w-full">{status} order</span>
        </div>
      </div>

      <div className="flex bg-stone-300 justify-between p-4 items-center font-semibold">
        <p className="text-xl">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>  
      <ul className="mt-5 divide-stone-300 border-stone-300 border-b border-t divide-y">
        {cart.map(item => <OrderItem item={item} id={item.pizzaId}/>)}
      </ul>
      <div className="flex flex-col p-4 font-semibold bg-stone-300 mt-6 space-y-2">
        <p className="text-stone-800">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-stone-800">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-xl font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
