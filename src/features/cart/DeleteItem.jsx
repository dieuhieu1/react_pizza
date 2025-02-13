import React from 'react'
import Button from '../../UI/Button'
import { useDispatch } from 'react-redux'
import { deleteItems } from './cartSlice';

const DeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch();
    return (
        <Button type="small" onClick={() => dispatch(deleteItems(pizzaId))}>Delete</Button>
    )
}

export default DeleteItem