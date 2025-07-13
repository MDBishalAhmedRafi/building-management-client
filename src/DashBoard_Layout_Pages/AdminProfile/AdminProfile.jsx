import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import Loading from "../../Main_Layout_Pages/Loading/Loading";


const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const totalRooms = stats.totalRooms || 1;
  const available = stats.availableRooms || 0;
  const unavailable = stats.unavailableRooms || 0;

  const percentageAvailable = (available / totalRooms) * 100;
  const percentageUnavailable = (unavailable / totalRooms) * 100;

  const pieData = [
    { name: "Available Rooms", value: available },
    { name: "Unavailable Rooms", value: unavailable },
  ];

  const COLORS = ["#BBF7D0", "#FECACA"]; // green and red shades

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#987b53] mb-10">
        Admin Profile
      </h2>

      {/* Profile */}
      <div
        className="flex flex-col items-center shadow-md rounded-xl p-6 mb-10"
        data-aos="fade-up"
      >
        <img
          src={user?.photoURL || "https://i.ibb.co/ZK1ZLjr/user.png"}
          alt="Admin"
          className="w-24 h-24 rounded-full border-4 border-[#987b53] mb-4"
        />
        <h3 className="text-xl font-semibold">{user?.displayName}</h3>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-orange-100 text-center rounded-xl p-6 shadow-md" data-aos="zoom-in">
          <h4 className="text-xl font-semibold text-orange-700">Total Rooms</h4>
          <p className="text-3xl font-bold mt-2">{stats.totalRooms}</p>
        </div>

        <div className="bg-green-100 text-center rounded-xl p-6 shadow-md" data-aos="zoom-in">
          <h4 className="text-xl font-semibold text-green-700">Available (%)</h4>
          <p className="text-3xl font-bold mt-2">{percentageAvailable.toFixed(1)}%</p>
        </div>

        <div className="bg-red-100 text-center rounded-xl p-6 shadow-md" data-aos="zoom-in">
          <h4 className="text-xl font-semibold text-red-700">Unavailable (%)</h4>
          <p className="text-3xl font-bold mt-2">{percentageUnavailable.toFixed(1)}%</p>
        </div>

        <div className="bg-blue-100 text-center rounded-xl p-6 shadow-md" data-aos="zoom-in">
          <h4 className="text-xl font-semibold text-blue-700">Total Users</h4>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-purple-100 text-center rounded-xl p-6 shadow-md" data-aos="zoom-in">
          <h4 className="text-xl font-semibold text-purple-700">Total Members</h4>
          <p className="text-3xl font-bold mt-2">{stats.totalMembers}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="shadow-md rounded-xl p-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold mb-4 text-center">Room Availability Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProfile;
