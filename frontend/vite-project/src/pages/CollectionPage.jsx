import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";

function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [isFilterSideBarOpen, setIsFilterSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSideBar = () => {
    setIsFilterSideBarOpen(!isFilterSideBarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsFilterSideBarOpen(false);
    }
  };

  useEffect(() => {
    //add event listener for sidebar click
    document.addEventListener("mousedown", handleClickOutside);

    //clean the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 100,
          images: [{ url: "https://picsum.photos/500/500?random=1" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 120,
          images: [{ url: "https://picsum.photos/500/500?random=2" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 90,
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 150,
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
        {
          _id: 5,
          name: "Product 5",
          price: 110,
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: 6,
          name: "Product 6",
          price: 130,
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: 7,
          name: "Product 7",
          price: 95,
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: 8,
          name: "Product 8",
          price: 140,
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
      ];

      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Side bar  */}
      <div
        ref={sidebarRef}
        className={`${isFilterSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="grow p-4">
        <h4 className="text-2xl uppercase mb-4">All Collection</h4> 

        {/* sort option low to high */}
        <SortOption />

        {/* Products Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default CollectionPage;
