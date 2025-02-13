import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItems, deleteItems, getQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantityItem from "../cart/UpdateQuantityItem";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();  
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const pizzaQuantity = useSelector(
    getQuantityById(id)
  ) 

  const isInCart = pizzaQuantity > 0;
  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1
    }
    dispatch(addItems(newItem))
  }
  return (
    <li className="flex gap-4 py-3">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ""}`}/>
      <div className="flex flex-col grow pt-1">
        <p>{name}</p>
        <p className="text-sm italic capitalize text-stone-500">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>}
          {isInCart && 
          
          <div className="flex gap-2">
            <UpdateQuantityItem pizzaId={id} quantity={pizzaQuantity}/>
            <DeleteItem pizzaId={id}/>
          </div>
          }
        {!soldOut && !isInCart && <Button type={"small"} onClick={handleAddToCart}>Add to cart</Button> }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
