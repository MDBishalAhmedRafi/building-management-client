import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

   // Initialize AOS
    useEffect(() => {
      AOS.init({ duration: 700 });
    }, []);

  const { data: agreement = {} } = useQuery({
    queryKey: ["member-agreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
      return res.data[0] || {};
    },
  });

  return (
    <motion.div
    data-aos="fade-up"
      className="max-w-xl mx-auto shadow-lg p-6 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">My Profile</h2>
      <div className="space-y-3 text-lg">
        <p>
          <strong>Name:</strong> {user?.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Agreement Date:</strong>{" "}
          {agreement?.agreementTime
            ? new Date(agreement.agreementTime).toLocaleDateString()
            : "None"}
        </p>
        <p>
          <strong>Block:</strong> {agreement?.blockName || "None"}
        </p>
        <p>
          <strong>Floor:</strong> {agreement?.floorNo || "None"}
        </p>
        <p>
          <strong>Rent:</strong> {agreement?.rent || "None"}
        </p>
        <p>
          <strong>Room No:</strong> {agreement?.apartmentNo || "None"}
        </p>
      </div>
    </motion.div>
  );
};

export default MemberProfile;
