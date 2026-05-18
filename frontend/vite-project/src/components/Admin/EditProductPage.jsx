import React from "react";
import { useState } from "react";

function EditProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
      {
        url: "https://picsum.photos/150?random=3",
      },
    ],
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleOnChange}
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">Description</label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleOnChange}
            rows={4}
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleOnChange}
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Count in Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleOnChange}
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleOnChange}
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            placeholder="Ex : S,M"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Color */}
        <div className="mb-6">
          <label className="block font-semibold mb-3">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            placeholder="Ex : Red,Blue"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="min-w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Image Upload */}
      </form>
    </div>
  );
}

export default EditProductPage;
