import React, { useState } from "react";
import {
  AiOutlineBars,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  FaBullhorn,
  FaFileSignature,
  FaTags,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import mainLogo from "../../assets/main_logo.png";
import useAuth from "../../Hooks/UseAuth/UseAuth";


const MemberSidebar = () => {
  const [isActive, setActive] = useState(false);
  const { user, logOut } = useAuth();

  const handleToggle = () => {
    setActive(!isActive);
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

  // On mobile, close sidebar after clicking link
  const handleLinkClick = () => {
    if (isActive) setActive(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
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
      <div
        className={`${
          isActive ? "block" : "hidden"
        } md:block bg-orange-50 w-64 md:fixed md:top-0 md:left-0 md:h-screen md:z-40 p-5 border-r overflow-y-auto`}
      >
        <nav className="space-y-2 pt-4">
          <NavLink
            to="/"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <AiOutlineHome size={20} />
            Back to Home
          </NavLink>

          <NavLink
            to="/member-dashboard/profile"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <FaUserShield size={18} />
            My Profile
          </NavLink>

          <NavLink
            to="/member-dashboard/make-payment"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <FaTags size={18} />
            Make Payment
          </NavLink>

          <NavLink
            to="/member-dashboard/payment-history"
            className={navItemStyle}
            onClick={handleLinkClick}
          >
            <FaUsersCog size={18} />
            Payment History
          </NavLink>

          <NavLink
            to="/member-dashboard/announcements"
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
      </div>
    </>
  );
};

export default MemberSidebar;
