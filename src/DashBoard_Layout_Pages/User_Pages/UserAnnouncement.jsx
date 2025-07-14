import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";

const UserAnnouncements = () => {
  const axiosSecure = useAxiosSecure();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-orange-500 font-semibold">
        Loading announcements...
      </div>
    );
  }

  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaBullhorn className="text-orange-500" />
        Announcements
      </h2>

      <div className="space-y-6">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <motion.div
              key={announcement._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-5 rounded-xl shadow-md border border-orange-100"
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">
                {announcement.title || "No Title"}
              </h3>
              <p className="text-gray-700">{announcement.description}</p>
              <p className="text-right text-xs text-gray-400 mt-2">
                {new Date(announcement.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default UserAnnouncements;
