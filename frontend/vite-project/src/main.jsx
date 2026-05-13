import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "sonner";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import Checkout from "./components/Cart/Checkout.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-right" />
    <Routes>
      {/* User Layout */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route
          path="collections/:collection"
          element={<CollectionPage />}
        ></Route>
        <Route path="product/:id" element={<ProductDetails />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route
          path="order-confirmation"
          element={<OrderConfirmationPage />}
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
