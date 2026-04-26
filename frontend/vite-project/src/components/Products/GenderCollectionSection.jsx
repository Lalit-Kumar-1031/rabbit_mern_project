import React from "react";
import menCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

function GenderCollectionSection() {
  return (
    <section className="py-16 px-4">
      <div
        className="container mx-auto flex
      flex-col md:flex-row gap-8"
      >
        {/* Women Collection */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            alt="women"
            className="w-full h-170 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="text-gray-900 underline hover:text-gray-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/*Men Collection */}
        <div className="relative flex-1">
          <img
            src={menCollectionImage}
            alt="Men"
            className="w-full h-170 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=men"
              className="text-gray-900 underline hover:text-gray-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;
