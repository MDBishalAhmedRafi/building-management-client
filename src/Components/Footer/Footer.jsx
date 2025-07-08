import React, { useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";
import logo from "../../assets/main_logo.png"

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-base-200 text-base-content px-4 md:px-20 py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" data-aos="fade-up">
        {/* Brand Info */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              BuildEase
            </span>
          </Link>
          <p className="text-sm text-gray-500">
            A smart Building Management System <br />
            Simplify apartment and payment management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/apartment">Apartment</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} BuildEase — All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
