import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrderDetailsPage() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",

      shippingAddress: {
        city: "New York",
        country: "USA",
      },

      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },

        {
          productId: "2",
          name: "Sneakers",
          price: 90,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },

        {
          productId: "3",
          name: "T-Shirt",
          price: 45,
          quantity: 3,
          image: "https://picsum.photos/150?random=3",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found!</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Info */}

          <div className="flex flex-col sm:flex-row justify-between mb-8">
            {/* Left side */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-1">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Right Side */}
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Paid" : "COD"}
              </span>
              <span
                className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Delivery Pending"}
              </span>
            </div>
          </div>
          {/* Customer ,Payment ,Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb2">Payment Info</h4>
              <span className="text-gray-500 block mt-5">
                Payment Method:{" "}
                <span className="font-bold">{orderDetails.paymentMethod}</span>
              </span>
              <span className="text-gray-500 block mt-5">
                Payment Status:{" "}
                <span
                  className={`p-2 ${orderDetails.isPaid ? "bg-green-100" : "bg-yellow-100"} rounded-lg`}
                >
                  {orderDetails.isPaid ? "Paid" : "Payment Pending"}
                </span>
              </span>
            </div>
            {/* shippingAddress */}
            <div>
              <h4 className="text-lg font-semibold mb2">Shipping Info</h4>
              <span className="text-gray-500 block mt-5">
                Shipping Method:{" "}
                <span className="font-bold">{orderDetails.shippingMethod}</span>
              </span>
              <span className="text-gray-500 block mt-5">
                Address:{" "}
                <span className="font-bold">
                  {orderDetails.shippingAddress.city}{" "}
                  {orderDetails.shippingAddress.country}
                </span>
              </span>
            </div>
          </div>
          {/* Product List */}
        </div>
      )}
    </div>
  );
}

export default OrderDetailsPage;
