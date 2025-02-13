import React from 'react'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'
import { useDispatch } from 'react-redux'
import Button from '../../UI/Button';

const UpdateQuantityItem = ({pizzaId, quantity}) => {
  const dispatch = useDispatch();
    return (
    <div className='flex gap-2 items-center font-bold'>
        <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span>{quantity}</span>
        <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateQuantityItem