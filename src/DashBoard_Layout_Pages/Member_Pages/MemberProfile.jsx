import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: agreement = {} } = useQuery({
    queryKey: ["member-agreement", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user?.email}`);
      return res.data[0] || {};
    },
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div
        className="bg-white shadow-xl rounded-xl p-6 text-center"
        data-aos="fade-up"
      >
        <img
          src={user?.photoURL || "https://i.ibb.co/ZK1ZLjr/user.png"}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{user?.displayName}</h2>
        <p className="text-gray-600 mb-4">{user?.email}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-100 p-3 rounded shadow" data-aos="zoom-in">
            <h4 className="font-semibold">Floor</h4>
            <p>{agreement.floor || "N/A"}</p>
          </div>
          <div className="bg-green-100 p-3 rounded shadow" data-aos="zoom-in">
            <h4 className="font-semibold">Block</h4>
            <p>{agreement.block || "N/A"}</p>
          </div>
          <div className="bg-orange-100 p-3 rounded shadow" data-aos="zoom-in">
            <h4 className="font-semibold">Room No</h4>
            <p>{agreement.apartmentNo || "N/A"}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded shadow" data-aos="zoom-in">
            <h4 className="font-semibold">Rent</h4>
            <p>{agreement.rent || "N/A"}</p>
          </div>
          <div className="bg-pink-100 p-3 rounded shadow" data-aos="zoom-in">
            <h4 className="font-semibold">Agreement Date</h4>
            <p>{agreement.agreementTime?.split("T")[0] || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
