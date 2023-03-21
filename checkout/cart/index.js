// idk exactly what this does but it's needed for the cart to work
import React, { useEffect } from "react";

// imports stripe
import { loadStripe } from "@stripe/stripe-js";

// idk what this does
import { useLazyQuery } from "@apollo/client";

// imports the query
import { QUERY_CHECKOUT } from "../../utils/queries"; // need to fix to match our project

// imports the helper function
// ----- maybe make it talk to auth in the utils folder?
import { idbPromise } from "../../utils/helpers"; // need to fix to match our project

// imports the cart item component
import CartItem from "../CartItem"; // need a cart item component for our project

// imports the auth helper function
import Auth from "../../utils/auth"; // need to fix to match our project

// imports the global state
import { useStoreContext } from "../../utils/GlobalState"; // need to fix to match our project

// imports actions? not totally sure
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions"; // need to fix to match our project
import "./style.css";

// creates a stripe object?
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // need to set keys in .env

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  //using the react hook useEffect to check if the data is there? I think?
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    console.log("productIds", productIds);
    console.log("key", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
