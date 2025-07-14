import React from 'react';
import { Link, NavLink } from 'react-router';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";
import logo from "../../assets/main_logo.png"
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { toast } from 'react-toastify';
import useRole from '../../Hooks/UserRole/useRole';
import Loading from '../../Main_Layout_Pages/Loading/Loading';
const Navbar = () => {
  const {user, logOut} = useAuth();
  const { role, isLoading: roleLoading } = useRole();
  if(roleLoading) { 
    return <Loading></Loading>;
  }
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warn("User has logged out", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      })
      .catch(() => {});
  };
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-10 py-3 fixed top-0 left-0 w-full z-[2000]">
      {/* Start: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-primary tracking-wide">BuildEase</span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-6">
        <NavLink to="/" className="text-base font-medium hover:text-[#c79d77] transition">Home</NavLink>
        <NavLink to="/apartment" className="text-base font-medium hover:text-[#c79d77] transition">Apartment</NavLink>
      </div>

      {/* End: Login Dropdown */}
      { 
        user ? <div className="flex-none dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            
              <img
                src={user.photoURL}
                alt="User"
                className="w-9 h-9 rounded-full border border-[#c79d77] p-[2px]"
              />
            
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
  <li className="text-center text-lg font-semibold text-primary pointer-events-none">
    {user?.displayName}
  </li>
  <li>
    {role === 'admin' && <NavLink to="/dashboard">
      <MdDashboardCustomize className="text-lg" />
      Dashboard
    </NavLink>}
    {role === 'member' && <NavLink to="/member-dashboard">
      <MdDashboardCustomize className="text-lg" />
      Dashboard
    </NavLink>}
    {role === 'user' && <NavLink to="/user-dashboard">
      <MdDashboardCustomize className="text-lg" />
      Dashboard
    </NavLink>}
  </li>
  <li>
    <button onClick={handleLogOut}>
      <FiLogOut className="text-lg" />
      Log Out
    </button>
  </li>
</ul>
      </div> :  <Link to='/login'><FiLogIn className="text-2xl text-[#ae825b]"/></Link>
      }

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end ml-2">
        <label tabIndex={1} className="btn btn-ghost">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-52">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/apartment">Apartment</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
