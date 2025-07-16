import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";
import Loading from "../../Main_Layout_Pages/Loading/Loading";

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
    return <Loading></Loading>
  }

  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FaBullhorn className="text-orange-500" />
        Announcements
      </h2>

      <div className="space-y-6">
        {announcements.length === 0 ? (
          <p className="text-center">No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <motion.div
              key={announcement._id}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl shadow-md border-l-4border-[#987b53]"
            >
              <h3 className="text-xl font-semibold text-[#987b53] mb-2">
                {announcement.title || "No Title"}
              </h3>
              <p className="">{announcement.description}</p>
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
