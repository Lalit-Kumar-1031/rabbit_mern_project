import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  //Handle the Add To cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    console.log("Updating Quantity", {
      productId,
      quantity,
      delta,
      newQuantity,
    });
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };

  //Handle Remove from cart
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        color,
        size,
      }),
    );
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 mr-4 object-cover rounded"
          />
          <div>
            <h3>{product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {product.size} | Color : {product.color}
            </p>
            <div className="flex items-center mt-2">
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium bg-red-600 border-none text-white w-7"
              >
                -
              </button>
              <span className="mx-4">{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium bg-green-600 border-none text-white w-7"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()} </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
            >
              <AiFillDelete className="w-6 h-6 mt-2 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;
