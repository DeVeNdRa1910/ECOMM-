import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action)=>{
      const index = state.findIndex(item=> item.id===action.payload.id);
      if(index !== -1){
        const prevQuant = state[index].quantity;
        state[index].quantity = prevQuant+1;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action)=>{
      const index = state.findIndex(item=> item.id === action.payload.id);
      if(index !== -1){
        const prevQuant = state[index].quantity;
        if(prevQuant === 1){
          state.splice(index,1);
        } else if(prevQuant >1){
          state[index].quantity = prevQuant-1;
        }
      }
    }
  }
})

export const {add, remove} = cartSlice.actions;

export default cartSlice.reducer;