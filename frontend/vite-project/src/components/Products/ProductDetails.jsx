import React from "react";

function ProductDetails() {
  const selectedProduct = {
    name: "Stylish Jacket",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",

    sizes: ["S", "M", "L", "XL"],

    colors: ["Red", "Black"],

    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket 3",
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left ThumbNails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                key={index}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={selectedProduct.images[1].url}
                alt="main Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                key={index}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
              />
            ))}
          </div>
          {/* Right Side Product Details */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              $ {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
