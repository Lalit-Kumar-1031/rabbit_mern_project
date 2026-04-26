import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivalsSlider = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/200?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Casual T-Shirt",
      price: 40,
      images: [
        {
          url: "https://picsum.photos/200?random=2",
          altText: "Casual T-Shirt",
        },
      ],
    },
    {
      _id: "3",
      name: "Denim Jeans",
      price: 80,
      images: [
        { url: "https://picsum.photos/200?random=3", altText: "Denim Jeans" },
      ],
    },
    {
      _id: "4",
      name: "Running Shoes",
      price: 95,
      images: [
        { url: "https://picsum.photos/200?random=4", altText: "Running Shoes" },
      ],
    },
    {
      _id: "5",
      name: "Leather Wallet",
      price: 60,
      images: [
        {
          url: "https://picsum.photos/200?random=5",
          altText: "Leather Wallet",
        },
      ],
    },
    {
      _id: "6",
      name: "Smart Watch",
      price: 150,
      images: [
        { url: "https://picsum.photos/200?random=6", altText: "Smart Watch" },
      ],
    },
    {
      _id: "7",
      name: "Backpack",
      price: 70,
      images: [
        { url: "https://picsum.photos/200?random=7", altText: "Backpack" },
      ],
    },
    {
      _id: "8",
      name: "Sunglasses",
      price: 55,
      images: [
        { url: "https://picsum.photos/200?random=8", altText: "Sunglasses" },
      ],
    },
    {
      _id: "9",
      name: "Formal Shirt",
      price: 65,
      images: [
        { url: "https://picsum.photos/200?random=9", altText: "Formal Shirt" },
      ],
    },
    {
      _id: "10",
      name: "Sports Cap",
      price: 25,
      images: [
        { url: "https://picsum.photos/200?random=10", altText: "Sports Cap" },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction == "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-6">Explore New Arrivals</h2>
        <p className="text-gray-600 text-lg mb-8">
          Discover the latest products added to our collection. Shop fresh
          styles and upgrade your look today.
        </p>
        {/* Scroll Button */}
        <div className="absolute right-0 -bottom-7.5 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      {/* Scrollable Product section */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative px-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-full sm:min-w-[50%] lg:min-w-[30%] relative "
          >
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full h-125 object-cover rounded-lg"
              draggable="false"
            />

            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white rounded-b-lg p-4">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSlider;
