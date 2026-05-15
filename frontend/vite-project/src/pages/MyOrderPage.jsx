import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrderPage() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // fetching the order
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "102",
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },
          orderItems: [
            {
              name: "Apple iPhone 15 Pro",
              image: "https://picsum.photos/500/500?random=1",
            },
          ],
          totalPrice: 1200,
          isPaid: true,
        },

        {
          _id: "103",
          createdAt: new Date(),
          shippingAddress: {
            city: "Los Angeles",
            country: "USA",
          },
          orderItems: [
            {
              name: "Samsung Galaxy S24 Ultra",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 1100,
          isPaid: false,
        },

        {
          _id: "104",
          createdAt: new Date(),
          shippingAddress: {
            city: "Chicago",
            country: "USA",
          },
          orderItems: [
            {
              name: "Sony WH-1000XM5 Headphones",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 399,
          isPaid: true,
        },

        {
          _id: "105",
          createdAt: new Date(),
          shippingAddress: {
            city: "Houston",
            country: "USA",
          },
          orderItems: [
            {
              name: "Nike Air Max Sneakers",
              image: "https://picsum.photos/500/500?random=4",
            },
          ],
          totalPrice: 180,
          isPaid: false,
        },

        {
          _id: "106",
          createdAt: new Date(),
          shippingAddress: {
            city: "San Francisco",
            country: "USA",
          },
          orderItems: [
            {
              name: "Logitech Mechanical Keyboard",
              image: "https://picsum.photos/500/500?random=5",
            },
          ],
          totalPrice: 150,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 ">My Orders</h2>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 whitespace-nowrap">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 text-gray-900 font-medium whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {""}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : `NA`}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${order.isPaid ? "bg-green-100 text-green-700 py-2 px-2 rounded-lg" : "bg-red-100 text-red-700 py-2 px-2 rounded-lg"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-2 px-2 sm:py-4 sm:px-4 text-gray-500 text-center"
                >
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrderPage;
