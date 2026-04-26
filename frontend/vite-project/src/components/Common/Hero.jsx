import React from "react";
import heroImage from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative">
      <img
        src={heroImage}
        alt="Hero Image"
        className="w-full h-100 md:h-150 lg:h-190 object-cover"
      />
      <div className="absolute inset-0 bg-black/5  flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter mb-4">
            Vocation Ready
          </h1>
          <p className="text-sm md:text-lg mb-6 tracking-tighter bg-black/20 py-2 rounded-2xl">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="#"
            className="bg-white text-gray-900 text-lg px-6 py-3 rounded-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
