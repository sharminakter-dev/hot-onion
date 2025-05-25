import React from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CartSaver = () => {
  const cart = useSelector(state => state.cart);
  const email = useSelector(state => state.auth.user?.email);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  useEffect(() => {
    if (isSignedIn && email && cart.length > 0) {
      sessionStorage.setItem(`cart-${email}`, JSON.stringify(cart));
    }
  }, [cart, email, isSignedIn]);

  return null;
};

export default CartSaver;