import React from 'react';
import { Link } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogIn } from "react-icons/fi";
import logo from "../../assets/main_logo.png"
const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-10 py-3 fixed top-0 left-0 w-full z-50">
      {/* Start: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-primary tracking-wide">BuildEase</span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-base font-medium hover:text-[#c79d77] transition">Home</Link>
        <Link to="/apartment" className="text-base font-medium hover:text-[#c79d77] transition">Apartment</Link>
      </div>

      {/* End: Login Dropdown */}
      <div className="flex-none dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <FiLogIn className="text-2xl text-[#ae825b]" />
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          {/* Add your login options here */}
          <li><a>Register</a></li>
          <li><a>Admin Panel</a></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end ml-2">
        <label tabIndex={1} className="btn btn-ghost">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-52">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/apartment">Apartment</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
