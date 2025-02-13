import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers.js'
function CartOverview() {

  const totalCartQuantity = useSelector(getTotalQuantity)
  const totalCartPrice = useSelector(getTotalPrice)

  if (!totalCartPrice ) {
    return null;
  }

  return (
    <div className="flex justify-between bg-stone-900 p-4 font-medium uppercase text-stone-200 sm:p-8">
      <p className="space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
