import React from 'react';
import { useStoreContext } from "../../utils/GlobalState"; // need to fix to match our project
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions"; // need to fix to match our project
import { idbPromise } from "../../utils/helpers"; // need to fix to match our project, can use same solution form cart/index.js

//basically need to change the names of everything to match our project
//need to make sure that the cart item component is in the right place

//
const CartItem = ({ item }) => { // cart item contains the item and the quantity

  const [, dispatch] = useStoreContext(); //

  const removeFromCart = item => { // query might not be right
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => { // e is the event
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  // why is return not a template literal?
  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
