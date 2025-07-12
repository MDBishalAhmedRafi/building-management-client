import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import Loading from "../../Main_Layout_Pages/Loading/Loading"
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const {
    data: members = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data;
    },
  });

  const handleRemove = async (email) => {
    try {
      const res = await axiosSecure.patch(`/members/${email}/role`, {
        role: "user",
      });

      if (res.data.success) {
        toast.success("Member demoted to user.");
        refetch();
      } else {
        toast.error("Failed to update role.");
      }
    } catch (error) {
      toast.error("An error occurred.");
       console.log(error)
    }
   
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-[#987b53] mb-10"
        data-aos="fade-down"
      >
        Manage Members
      </h2>

      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        data-aos="fade-up"
      >
        <table className="table w-full min-w-[600px]">
          <thead className="bg-[#987b53] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  <Loading></Loading>
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr
                  key={member._id}
                  className="border-b hover:bg-orange-50 transition duration-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
