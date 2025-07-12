// import React, { useRef, useState,} from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import Lottie from "lottie-react";
// import loginAnimation from "../../assets/login.json";
// import useAuth from "../../Hooks/UseAuth/UseAuth";

// const Login = () => {
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { logIn, googleLogIn } = useAuth();
//   const emailRef = useRef();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleForgotPassword = () => {
//     navigate("/forget-password", {
//       state: { email: emailRef.current.value },
//     });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     logIn(email, password)
//       .then(() => {
//         toast.success("User has Successfully Logged In", {
//           position: "top-right",
//           autoClose: 3000,
//           theme: "light",
//         });
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         setError(error.code);
//         toast.warn("Something is wrong", {
//           position: "top-right",
//           autoClose: 3000,
//           theme: "light",
//         });
//       });
//   };

//   const handleGoogleLog = () => {
//     googleLogIn()
//       .then(() => {
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         setError(error.code);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full shadow-xl rounded-xl p-6 md:p-12">
//         {/* Lottie Animation */}
//         <div className="hidden md:flex justify-center">
//           <Lottie animationData={loginAnimation} loop className="max-w-sm" />
//         </div>

//         {/* Login Form */}
//         <div>
//           <h2 className="text-3xl font-bold text-center text-[#987b53]">Login to Your Account</h2>
//           <div className="border-b border-gray-300 mt-2 mb-6 relative">
//             <div className="absolute left-1/2 -bottom-[1px] transform -translate-x-1/2 w-16 h-[2px] bg-blue-500" />
//           </div>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <input
//               type="email"
//               name="email"
//               ref={emailRef}
//               placeholder="Email"
//               required
//               className="input input-bordered w-full"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 required
//                 className="input input-bordered w-full pr-12"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2">
//                 <input type="checkbox" className="checkbox checkbox-sm" />
//                 <span className="text-gray-600">Remember me</span>
//               </label>
//               <div
//                 className="text-[#987b53] hover:underline cursor-pointer"
//                 onClick={handleForgotPassword}
//               >
//                 Forget Password?
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary bg-[#987b5380] hover:bg-[#987b53] font-bold border-gray-300 w-full">
//               Login
//             </button>

//             <div className="divider">OR</div>

//             <button
//               type="button"
//               onClick={handleGoogleLog}
//               className="btn btn-outline border-[#987b53] w-full flex items-center gap-2 justify-center"
//             >
//               <FcGoogle className="text-xl" />
//               Continue with Google
//             </button>

//             {error && <p className="text-red-500 text-sm">{error}</p>}
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-6">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-[#987b53] font-bold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    logIn(email, password)
      .then(() => {
        toast.success("User has Successfully Logged In", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        navigate(location?.state?.from ? location.state?.from : "/");
      })
      .catch((error) => {
        setError(error.code);
        toast.warn("Something is wrong", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      });
  };

  const handleGoogleLog = () => {
    googleLogIn()
      .then(() => {
        navigate(location?.state?.from ? location.state?.from : "/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full shadow-xl rounded-xl p-6 md:p-12">
        
        {/* Login Form (on top in mobile) */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#987b53]">
            Login to Your Account
          </h2>
          <div className="border-b border-gray-300 mt-2 mb-6 relative">
            <div className="absolute left-1/2 -bottom-[1px] transform -translate-x-1/2 w-16 h-[2px] bg-blue-500" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
              required
              className="input input-bordered w-full"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <div
                className="text-[#987b53] hover:underline cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forget Password?
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary bg-[#987b5380] hover:bg-[#987b53] font-bold border-gray-300 w-full"
            >
              Login
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleLog}
              className="btn btn-outline border-[#987b53] w-full flex items-center gap-2 justify-center"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#987b53] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Lottie Animation (always visible) */}
        <div className="flex justify-center items-center">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-72 md:w-96 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

