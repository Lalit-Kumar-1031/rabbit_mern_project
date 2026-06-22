import React, { useEffect, useState } from "react";
import Hero from "../components/Common/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivalsSlider from "../components/Products/NewArrivalsSlider";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeatureSection from "../components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import Loading from "../components/Common/Loading";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //Fetch Products for Women Top Wear
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      }),
    );

    //Fetch Best Seller Products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
        console.log("Response =>", response.data);
      } catch (error) {
        console.error("Error in Best Seller =>", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivalsSlider />
      {/* Best Seller  */}
      <h2 className="text-center text-3xl font-bold mb-4 mt-8">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <Loading Title="Loading Best Seller Product"></Loading>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-medium mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
}

export default Home;
