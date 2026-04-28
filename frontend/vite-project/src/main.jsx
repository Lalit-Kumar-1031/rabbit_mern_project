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
      </Route>
    </Routes>
  </BrowserRouter>,
);
