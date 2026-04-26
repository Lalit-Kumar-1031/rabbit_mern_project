import React from "react";
import Hero from "../components/Common/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivalsSlider from "../components/Products/NewArrivalsSlider";
import ProductDetails from "../components/Products/ProductDetails";

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivalsSlider />
      {/* Best Seller  */}
      <h2 className="text-center text-3xl font-bold mb-4 mt-8">Best Seller</h2>
      <ProductDetails />
    </div>
  );
}

export default Home;
