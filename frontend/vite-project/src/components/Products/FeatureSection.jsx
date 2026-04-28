import React from "react";
import { HiShoppingBag } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineCreditCard } from "react-icons/hi";

function FeatureSection() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 founded-full mb-4 ">
            <HiShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h4>
          <p className="text-gray-600 tex-sm tracking-tighter">
            on all Orders over $100.00
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 founded-full mb-4">
            <HiArrowPathRoundedSquare className="w-6 h-6" />
          </div>
          <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
          <p className="text-gray-600 tex-sm tracking-tighter">
            Money back guarantee
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 founded-full mb-4">
            <HiOutlineCreditCard className="w-6 h-6" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-gray-600 tex-sm tracking-tighter">
            100% Secure checkout process
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
