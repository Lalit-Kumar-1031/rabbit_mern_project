import React from "react";
import Hero from "../components/Common/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivalsSlider from "../components/Products/NewArrivalsSlider";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeatureSection from "../components/Products/FeatureSection";

const topWearforWomen = [
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

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivalsSlider />
      {/* Best Seller  */}
      <h2 className="text-center text-3xl font-bold mb-4 mt-8">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-medium mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={topWearforWomen} />
      </div>
      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
}

export default Home;
