import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: "deliveryForm",
    initialState:{},
    reducers:{
        formSubmit: (state,action)=>{
            return action.payload;
        }
    }
});
export const {formSubmit} = formSlice.actions;
export default formSlice.reducer;