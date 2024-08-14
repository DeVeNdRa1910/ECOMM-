import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const cartNumberSlice = createSlice({
  name: "cartNumber",
  initialState: initialState,
  reducers: {
    increase: (state, action)=>{
      return state+action.payload;
    },
    decrease: (state, action)=>{
      if(state === 0) return 0;
      return state-action.payload;
    },
    clearCart: (state, action)=>{
      return action.payload;
    }
  }
})

export const {increase, decrease} = cartNumberSlice.actions;
export default cartNumberSlice