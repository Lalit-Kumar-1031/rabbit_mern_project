import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {mergeCart} from '../redux/slices/cartSlice';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate=useNavigate();
  const location=useLocation();
  const {user,guestId} =useSelector((state)=>state.auth);
  const {cart}=useSelector((state)=>state.cart);

  //Get the redirection parameter and check if its checkout and something else
  const redirect=new URLSearchParams(location.search).get("redirect")||"/";
  const isCheckoutRedirect=redirect.includes("checkout");


  useEffect(()=>{
    if(user){
      if(cart?.products.length>0 && guestId){
        dispatch(mergeCart({guestId,user})).then(()=>{
          navigate(isCheckoutRedirect?"/checkout":"/");
        })
      }else{
        navigate(isCheckoutRedirect?"/checkout":"/");
      }
    }
  },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 ">
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
