import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/register.json";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const { createUser, updateUser, googleLogIn, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mutation to save user info to backend
  const saveUserMutation = useMutation(
   
    {
      mutationFn:  (userData) => axiosSecure.post("/users", userData),
      onSuccess: () => {
        toast.success("User saved successfully!", { position: "top-right" });
      },
      onError: () => {
        toast.error("Failed to save user info.", { position: "top-right" });
      },
    }
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!hasUppercase.test(password)) {
      setPassError("Password should have an uppercase letter.");
      return;
    } else if (!hasLowercase.test(password)) {
      setPassError("Password should have a lowercase letter.");
      return;
    } else if (password.length < 6) {
      setPassError("Password should be more than 6 characters.");
      return;
    } else {
      setPassError("");
    }

    try {
      const userCredential = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...userCredential.user, displayName: name, photoURL: photo });

      // Save user to backend with default role 'user'
      saveUserMutation.mutate({
        email,
        name,
        photoURL: photo,
        role: "user",
      });

      toast.success("User Registered Successfully", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Try again.", {
        position: "top-right",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogIn();
      const loggedUser = result.user;

      setUser(loggedUser);

      // Save Google user to backend with default role 'user'
      saveUserMutation.mutate({
        email: loggedUser.email,
        name: loggedUser.displayName || "Google User",
        photoURL: loggedUser.photoURL,
        role: "user",
      });

      navigate("/");
    } catch (error) {
      toast.error("Google login failed. Try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full shadow-xl rounded-xl p-6 md:p-12">
        {/* Register Form */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#987b53]">
            Register Your Account
          </h2>
          <div className="border-b border-gray-300 mt-2 mb-6 relative">
            <div className="absolute left-1/2 -bottom-[1px] transform -translate-x-1/2 w-16 h-[2px] bg-blue-500" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              className="input w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              className="input w-full"
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo Url"
              required
              className="input w-full"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Type Your Password"
                required
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="btn btn-outline border-[#987b53] w-full flex items-center gap-2 justify-center"
              >
                <FcGoogle size={24} />
                Register With Google
              </button>
            </div>

            {passError && <p className="text-red-500">{passError}</p>}

            <button
              type="submit"
              className="btn btn-primary bg-[#987b5380] hover:bg-[#987b53] font-bold border-gray-300 w-full"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#987b53] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center items-center">
          <Lottie animationData={loginAnimation} loop className="w-72 md:w-96 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Register;
