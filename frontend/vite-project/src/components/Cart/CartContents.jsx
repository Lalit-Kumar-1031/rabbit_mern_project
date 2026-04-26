import React from "react";
import { AiFillDelete } from "react-icons/ai";

function CartContents() {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 40,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Shirt",
      size: "S",
      color: "White",
      quantity: 2,
      price: 25,
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 4,
      name: "Jacket",
      size: "XL",
      color: "Black",
      quantity: 1,
      price: 60,
      image: "https://picsum.photos/200?random=4",
    },
    {
      productId: 5,
      name: "Sneakers",
      size: "9",
      color: "White",
      quantity: 1,
      price: 80,
      image: "https://picsum.photos/200?random=5",
    },
    {
      productId: 6,
      name: "Cap",
      size: "Free",
      color: "Green",
      quantity: 2,
      price: 10,
      image: "https://picsum.photos/200?random=6",
    },
    {
      productId: 7,
      name: "Hoodie",
      size: "M",
      color: "Gray",
      quantity: 1,
      price: 45,
      image: "https://picsum.photos/200?random=7",
    },
    {
      productId: 8,
      name: "Shorts",
      size: "L",
      color: "Yellow",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=8",
    },
    {
      productId: 9,
      name: "Watch",
      size: "Free",
      color: "Black",
      quantity: 1,
      price: 120,
      image: "https://picsum.photos/200?random=9",
    },
    {
      productId: 10,
      name: "Backpack",
      size: "Free",
      color: "Brown",
      quantity: 1,
      price: 35,
      image: "https://picsum.photos/200?random=10",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
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
              <button className="border rounded px-2 py-1 text-xl font-medium bg-red-600 border-none text-white w-7">
                -
              </button>
              <span className="mx-4">{product.quantity}</span>
              <button className="border rounded px-2 py-1 text-xl font-medium bg-green-600 border-none text-white w-7">
                +
              </button>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()} </p>
            <button>
              <AiFillDelete className="w-6 h-6 mt-2 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;
