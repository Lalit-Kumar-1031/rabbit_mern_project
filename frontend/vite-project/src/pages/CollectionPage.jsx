import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

function CollectionPage() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const [isFilterSideBarOpen, setIsFilterSideBarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default CollectionPage;
