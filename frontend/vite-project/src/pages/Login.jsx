import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login ==>", { email, password });
  };
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 border rounded-lg shadow-sm"
        >
          <div className="flex justify-center mb-6 ">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! ✋</h2>
          <p className="text-center mb-6">Enter email and password to login.</p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-lg hover:bg-gray-700 text-center w-full p-2 font-semibold mt-2"
          >
            Sign In
          </button>
          <p className="mt-6 text-center text-sm">
            {" "}
            Don't have an account? {""}
            <Link to="/register" className="text-blue-500 ">
              register
            </Link>
          </p>
        </form>
      </div>
      {/* Right Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className=" w-full ">
          <img
            src={login}
            alt="Login Image"
            className="h-150 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
