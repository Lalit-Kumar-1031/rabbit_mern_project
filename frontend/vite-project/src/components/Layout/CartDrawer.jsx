import { HiMiniXMark } from "react-icons/hi2";
import CartContents from "../Cart/CartContents";

function CartDrawer({ drawerOpen, toggleDrawer }) {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/2.5 lg:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button type="button" onClick={toggleDrawer}>
          <HiMiniXMark className="h-6 w-6" />
        </button>
      </div>
      {/* Cart content with scrollable area */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* Cart Item List */}
        <CartContents />
      </div>
      {/* Checkout button at fixed */}
      <div className="p-4 bg-white sticky border-0">
        <button className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-800 transition">
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes, and discount code calculated at checkout.{" "}
        </p>
      </div>
    </div>
  );
}

export default CartDrawer;
