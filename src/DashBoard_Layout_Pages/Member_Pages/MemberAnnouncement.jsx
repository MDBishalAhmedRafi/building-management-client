import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { motion } from "framer-motion";

const MemberAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [] } = useQuery({
    queryKey: ["member-announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">Announcements</h2>
      {announcements.length === 0 && (
        <p className="text-center text-gray-500">No announcements found.</p>
      )}
      <ul>
        {announcements.map(({ _id, title, message, createdAt }) => (
          <li
            key={_id}
            className="p-4 rounded shadow mb-4 border-l-4 border-blue-600"
          >
            <h4 className="text-xl font-semibold">{title}</h4>
            <p className="mt-2">{message}</p>
            <p className="mt-2 text-sm text-gray-500">
              Posted: {new Date(createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MemberAnnouncement;
