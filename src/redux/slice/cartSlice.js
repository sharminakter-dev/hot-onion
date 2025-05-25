import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState: [],
    reducers: {
        setCart:(state, action)=>{
            return action.payload;
        },
        addToCart: (state, action)=>{
            const newItem =  action.payload;
            const existingItem = state.find(item=>item.id===newItem.id);
            if(existingItem){
                existingItem.quantity += newItem.quantity;
            }else{
                state.push({ ...newItem });
            }
        },
        removeFromCart: (state, action)=>{
            const id = action.payload;
            const remainingCart = state.filter(item =>item.id !== id);
            return remainingCart;
        },
        increaseQuantity: (state, action)=>{
            const id = action.payload;
            const existingItem  = state.find(item=>item.id===id)
            if(existingItem ){
                existingItem .quantity +=1;
            }
        },
        decreaseQuantity: (state, action)=>{
            const id = action.payload;
            const item = state.find(item =>item.id===id)
            if(item && item.quantity>1){
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.length = 0; 
        }
    }
    
});

export const {setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
