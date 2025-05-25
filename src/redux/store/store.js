import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "../slice/cartSlice";
import authReducer, { initialState as authInitialState }  from "../slice/authSlice";
import searchFoodReducer  from "../slice/searchFoodSlice";
import deliveryFormReducer  from "../slice/formSlice";

// Load cart from sessionStorage
export const loadCartFromSession = (email) => {
  try {
    const cartInSession = sessionStorage.getItem(`cart-${email}`);
    return cartInSession ? JSON.parse(cartInSession) : [];
  } catch (e) {
    return [];
  }
};

// Load userInfo from sessionStorage
const loadUserFromSession = () =>{
  try {
    const userInSession = sessionStorage.getItem("userInfo");
    return userInSession ? JSON.parse(userInSession) : authInitialState;
  }catch(e){
    return authInitialState;
  }
}

const user = loadUserFromSession();


const store = configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
      deliveryForm: deliveryFormReducer,
      searchFood: searchFoodReducer
    }, 
    preloadedState: {
      cart: user.user.email?loadCartFromSession(user.user.email):[],
      auth: loadUserFromSession(),
      deliveryForm:{}
    },
});


// Save to sessionStorage whenever state changes
store.subscribe(()=>{
    try{
        const state = store.getState();
        const email = state.auth.user.email;
        if(state.auth.isSignedIn && email && state.cart.length > 0){
          sessionStorage.setItem(`cart-${email}`, JSON.stringify(state.cart));
        }
        sessionStorage.setItem('userInfo', JSON.stringify(state.auth));
    }catch{
        return;
    }
})

export default store;