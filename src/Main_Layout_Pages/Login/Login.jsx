import React, { use, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/UseAuth/UseAuth";


const LogIn = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 Toggle state for password
  const { logIn, googleLogIn } = useAuth();
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/forget-password", {
      state: { email: emailRef.current.value },
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    logIn(email, password)
      .then(() => {
        // navigate(`${location.state ? location.state : "/"}`);
        toast.success('User has Successfully Log In', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate( location?.state ? location.state : "/")
        
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        toast.warn("Something is Wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleGoogleLog = () => {
    googleLogIn()
      .then(() => {
        
        navigate( location?.state ? location.state : "/")
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        
      });
  };

  return (
    <div className="lg:w-11/12 lg:mx-auto mx-s">
      <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-orange to-red-200 lg:mb-10 md:mb-7 mb-5 flex items-center justify-center rounded-2xl">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Login Your Account
          </h2>
          <div className="border-b border-gray-300 mt-2 mb-6 relative">
            <div className="absolute left-1/2 -bottom-[1px] transform -translate-x-1/2 w-16 h-[2px] bg-blue-500" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
              required
              className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Input with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-800 absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2  hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <div
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forget Password?
              </div>
            </div>

            {/* Google Login */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLog}
                className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FcGoogle size={24} />
                Login With Google
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-bold"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t you have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;