import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearCart} from '../redux/slices/cartSlice';

function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  //clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateDeliveryDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id & Date */}
            <div>
              <h3 className="text-xl font-semibold">
                Order ID : {checkout._id}
              </h3>
              <p className="text-gray-500 mt-1">
                Order Date : {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div className="text-emerald-700 text-sm">
              Estimated Delivery : {calculateDeliveryDate(checkout.createdAt)}
            </div>
          </div>
          {/* order Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                {/* Left section */}
                <div className="mb-4 flex items-center">
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>
                </div>
                {/* Right Side */}
                <div>
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} </p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and delivery info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Payment Method</h4>
              <p className="text-gray-500">Paypal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmationPage;
