import React, { useState } from "react";
import { AiOutlineBars, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { FaUser, FaBullhorn } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import mainLogo from "../../assets/main_logo.png";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const UserSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warn("User has logged out", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      })
      .catch(() => {});
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-2 block px-4 py-2 rounded hover:bg-[#ae825b] text-black dark:text-black ${
      isActive ? "bg-[#ae825b80] font-semibold" : ""
    }`;

  const handleLinkClick = () => {
    if (isActive) setIsActive(false);
  };

  return (
    <>
      {/* Topbar for mobile */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden sticky top-0 z-40">
        <div className="p-2">
          <Link to="/">
            <img src={mainLogo} className="w-[70px] h-[70px]" alt="Logo" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.div
        data-aos="fade-right"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`${
          isActive ? "block" : "hidden"
        } md:block bg-orange-50 w-64 md:fixed md:top-0 md:left-0 md:h-screen md:z-40 p-5 border-r overflow-y-auto`}
      >
        <nav className="space-y-2 pt-4">
          <NavLink to="/" className={navItemStyle} onClick={handleLinkClick}>
            <AiOutlineHome size={20} />
            Back to Home
          </NavLink>

          <NavLink
            to="/user-dashboard/profile"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <FaUser size={18} />
            My Profile
          </NavLink>

          <NavLink
            to="/user-dashboard/announcements"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <FaBullhorn size={18} />
            Announcements
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="mt-8 border-t pt-4">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-2 px-4 py-2 rounded bg-red-100 hover:bg-red-200 text-red-700 font-medium"
          >
            <AiOutlineLogout className="text-xl" />
            Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default UserSidebar;
