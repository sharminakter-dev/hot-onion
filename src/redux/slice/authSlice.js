import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  isSignedIn: false,
  isNewUser: false
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signup: (state, action)=>{
            state.user = action.payload;
            state.isSignedIn = true;
        },
        signin: (state, action)=>{
            state.user = action.payload;
            state.isSignedIn = true;
        },
        signout: state=>{
            state.user = {};
            state.isSignedIn = false;
        },
        toggleNewUser: state=>{
            state.isNewUser = !state.isNewUser;
        },
        setNewUser : (state, action)=>{
            state.isNewUser = action.payload;
        }
    }
});

export const {signup, signin, signout, toggleNewUser, setNewUser} = authSlice.actions;
export default authSlice.reducer;