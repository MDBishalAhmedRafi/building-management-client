import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const UserProfile = () => {
  const { user } = useAuth();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const profileInfo = {
    name: user?.displayName || "No Name",
    email: user?.email || "No Email",
    image: user?.photoURL || "https://i.ibb.co/ZVFsg37/default-avatar.jpg",
    agreementDate: "none",
    floor: "none",
    block: "none",
    room: "none",
  };

  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              My Profile
            </h2>
      <div className="shadow-xl rounded-2xl overflow-hidden p-6 md:p-10 border border-[#987b53]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profileInfo.image}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#987b53]"
          />
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold">
              {profileInfo.name}
            </h2>
            <p className="">{profileInfo.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className=" p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold">Agreement Date</h3>
            <p>{profileInfo.agreementDate}</p>
          </div>
          <div className=" p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold">Floor</h3>
            <p>{profileInfo.floor}</p>
          </div>
          <div className=" p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold">Block</h3>
            <p>{profileInfo.block}</p>
          </div>
          <div className=" p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold">Room No</h3>
            <p>{profileInfo.room}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
