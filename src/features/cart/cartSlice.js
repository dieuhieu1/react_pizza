import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 12, 
    //         name: "Mediterranean",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     }
    // ]
}

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        addItems: (state, action) => {
            // payload = newPizza
            state.cart.push(action.payload)
        },
        deleteItems: (state, action) => {
            // payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity: (state, action) => {
            // payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
            
        },
        decreaseItemQuantity: (state, action) => {
            // payload = pizzaId
          
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.unitPrice * item.quantity;
            if (item.quantity === 0) {
                cartSlice.caseReducers.deleteItems(state, action)
            } 
        },
        clearCart(state) {
            state.cart = [];
        }
    },
    
})

export const {addItems, deleteItems, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions; 
export const getCart = (state) => state.cart.cart;
export const getTotalPrice = (state) => state.cart.cart.reduce((totalPrice, item) => totalPrice + item.totalPrice, 0 )
export const getTotalQuantity = (state) => state.cart.cart.reduce((totalSum, item) => totalSum + item.quantity, 0)
export const getQuantityById = (id) => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0; 
export default cartSlice.reducer;