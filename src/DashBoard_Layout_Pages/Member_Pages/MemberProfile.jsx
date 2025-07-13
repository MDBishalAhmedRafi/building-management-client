
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-lg"
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
          <strong>Block:</strong> {agreement?.block || "None"}
        </p>
        <p>
          <strong>Floor:</strong> {agreement?.floor || "None"}
        </p>
        <p>
          <strong>Room No:</strong> {agreement?.apartmentNo || "None"}
        </p>
      </div>
    </motion.div>
  );
};

export default MemberProfile;
