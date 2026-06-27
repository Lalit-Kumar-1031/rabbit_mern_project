import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import Loading from "../Common/Loading";

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  //ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length == 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutData: {
            checkoutItems: cart?.products,
            shippingAddress,
            paymentMethod: "Paypal",
            totalPrice: cart?.totalPrice,
          },
        }),
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // Set Checkout Id if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.log(`Error in Paypal Payment =>${error}`);
    }
    // navigate("/order-confirmation");
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(`Error in finalize Checkout =>${error}`);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }
  if (error) {
    return <p>Error : {error}</p>;
  }
  if (!cart || !cart.products || cart.products.length == 0) {
    return <p>Cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 tracking-tighter py-10 px-6 mx-auto max-w-7xl">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user?.email ?? ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block mb-1">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block mb-1">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="text-gray-700 block mb-1">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4 ">Pay with Paypal</h3>
                {/* Paypal Button */}
                <PayPalButton
                  amount={Number(cart?.totalPrice).toFixed(2)}
                  onSuccess={handlePaymentSuccess}
                  onError={(e) => alert("Payment failed, Try again", e)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Side */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              className="flex justify-between items-center py-2 border-b"
              key={index}
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p className="font-medium">Subtotal</p>
          <p className="font-medium text-gray-700">
            ${cart.totalPrice.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p className="font-medium">Shipping</p>
          <p className="font-medium text-gray-700">Free</p>
        </div>
        <div className="flex justify-between items-center text-lg pt-4 border-t">
          <p className="font-medium">Total</p>
          <Link to="/order-confirmation">
            <p className="font-medium text-gray-700">
              ${cart.totalPrice.toLocaleString()}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
