import React, { useState } from "react";
import { AiOutlineBars, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import mainLogo from "../../assets/main_logo.png";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import { FaBullhorn, FaFileSignature, FaTags, FaUsersCog, FaUserShield } from "react-icons/fa";


const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { user, logOut } = useAuth();
  console.log(user)

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
           <NavLink to="/" className={navItemStyle}>
      <AiOutlineHome size={20} />
      Back to Home
    </NavLink>
          <NavLink to="/dashboard" className={navItemStyle}>
  <FaUserShield size={18} />
  Admin-Profile
</NavLink>
          <NavLink to="/dashboard/manage-members" className={navItemStyle}>
  <FaUsersCog size={18} />
  Manage Members
</NavLink>
          <NavLink to="/dashboard/announcement" className={navItemStyle}>
  <FaBullhorn size={18} />
  Make Announcement
</NavLink>
          <NavLink to="/dashboard/agreement-requests" className={navItemStyle}>
  <FaFileSignature size={18} />
  Agreement Requests
</NavLink>
          <NavLink to="/dashboard/manage-coupons" className={navItemStyle}>
  <FaTags size={18} />
  Manage Coupons
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

export default Sidebar;
