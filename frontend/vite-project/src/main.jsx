import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import Home from "./pages/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* User Layout */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
