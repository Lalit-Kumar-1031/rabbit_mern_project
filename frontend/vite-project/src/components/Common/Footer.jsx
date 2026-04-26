import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="text-lg text-gr mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about the new products, exclusive events, and
            online offers.
          </p>
          <p className="mb-6 font-medium text-sm text-gray-600">
            Sign up and get 10% off on your first order.
          </p>
          {/* Newsletter Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-3 w-full text-sm border-l border-t border-b border-gray-300 rounded-l-md
              focus:outline-none focus:right-2 focus:ring-gr transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-600 px-6 py-3 rounded-r-md text-sm transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Link */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-gray-800 hover:font-medium transition-colors"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>

            {/* Twitter */}
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FaTwitter className="h-5 w-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FaInstagram className="h-5 w-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-800 mb-4"> Call Us</p>
          <p>
            <IoCall className="mr-2 inline-block" />
            +91 9876543210
          </p>
        </div>
      </div>
      {/* Copy Right Text */}
      <div className="container mx-auto mt-12 px-4 border-t border-gray-200 pt-6">
        <p className="text-center tracking-tighter text-gray-600 text-sm">
          © 2026 CodeGyani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
