import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Import icons
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const {user, createUser, setUser, googleLogIn, updateUser } = use(AuthContext);
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log({ name, email, photo, password });

    if (!hasUppercase.test(password)) {
      setPassError("Password should have an uppercase letter.");
      return;
    } else {
      setPassError("");
    }

    if (!hasLowercase.test(password)) {
      setPassError("Password should have a lowercase letter.");
      return;
    } else {
      setPassError("");
    }

    if (password.length < 6) {
      setPassError("Password should be more than 6 characters.");
      return;
    } else {
      setPassError("");
    }

    createUser(email, password)
      .then(() => {
        toast.success('User have Register Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                // const user =user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
             
            navigate("/")
          })
          .catch(() => {
             
            setUser(user);
            
          });
      })
      .catch((error) => {
        console.log(error)
         toast.warn('There is a problem with register User', {
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

  const handleGoogle = () => {
    googleLogIn()
      .then(() => {
       
        navigate("/")
      })
      .catch(() => {
        
      });
      
  };

  return (
    <div className="lg:w-11/12 lg:mx-auto mx-2">
      <div className="min-h-screen bg-gradient-to-r from-red-200 via-orange to-orange-200 lg:mb-10 md:mb-7 mb-5  flex items-center justify-center rounded-2xl">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register Your Account
          </h2>
          <div className="border-b border-gray-300 mt-2 mb-6 relative">
            <div className="absolute left-1/2 -bottom-[1px] transform -translate-x-1/2 w-16 h-[2px] bg-blue-500" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Photo URL */}
            <input
              type="text"
              name="photo"
              placeholder="Photo Url"
              required
              className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password with Eye Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Type Your Password"
                required
                className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Google Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FcGoogle size={24} />
                Register With Google
              </button>
            </div>

            {/* Password Error */}
            {passError && <p className="text-red-500">{passError}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition font-bold"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Do you have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
