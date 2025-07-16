import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading.jsx";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth/UseAuth.jsx";

const Apartment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [agreedId, setAgreedId] = useState(null);

  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const limit = 6;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["apartments", currentPage, minRent, maxRent],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit,
        ...(minRent && { minRent }),
        ...(maxRent && { maxRent }),
      });
      const res = await axiosSecure.get(`/apartments?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });
  console.log(data)

  const { data: userAgreements = [] } = useQuery({
    queryKey: ["userAgreements", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/user/${user.email}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        setHasAgreed(true);
        setAgreedId(data[0].apartmentId);
      }
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleApplyFilter = () => {
    setMinRent(tempMin);
    setMaxRent(tempMax);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleAgreement = async (apt) => {
  if (!user) {
    toast.error("You must be logged in to agree.");
    return navigate("/login", { state: { from: location.pathname } });
  }

    if (hasAgreed) {
      return toast.error("You have already agreed to an apartment.");
    }

    const agreementData = {
      userName: user.displayName,
      email: user.email,
      apartmentId: apt._id,
      floorNo: apt.floorNo,
      blockName: apt.blockName,
      apartmentNo: apt.apartmentNo,
      rent: apt.rent,
    };

    try {
      const res = await axiosSecure.post("/agreements", agreementData);
      if (res.data.success) {
        toast.success("Agreement submitted successfully!");
        setHasAgreed(true);
        setAgreedId(apt._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "You already agreed!");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto bg-gradient-to-br from-base-200 to-base-100">
      <h2 className="text-3xl text-center md:text-4xl font-bold text-[#987b53] mb-6">
        Discover Our Apartments
      </h2>

      {/* Filter UI */}
      <div className="flex justify-end mb-10">
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-outline border-[#987b53] text-[#987b53]"
          >
            Filter by Rent
          </button>

          {showFilter && (
            <div className="absolute right-0 top-12 bg-white shadow-lg border rounded-md px-4 py-4 z-10 w-80">
              <div className="mb-2">
                <label className="block text-sm text-gray-600">Min Rent</label>
                <input
                  type="number"
                  value={tempMin}
                  onChange={(e) => setTempMin(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g. 1000"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600">Max Rent</label>
                <input
                  type="number"
                  value={tempMax}
                  onChange={(e) => setTempMax(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g. 3000"
                />
              </div>
              <button
                onClick={handleApplyFilter}
                className="btn btn-sm mt-2 w-full bg-[#987b53] text-white hover:bg-[#7b613c]"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Apartment List */}
      <div className="space-y-8">
        {data.apartments.map((apt, idx) => {
          const isAgreed = hasAgreed && agreedId === apt._id;

          return (
            <motion.div
              key={apt._id}
              className="flex flex-col md:flex-row rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="md:w-1/2 h-64 md:h-auto overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={apt.apartmentImage}
                  alt={apt.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </motion.div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <p className=" mb-2">{apt.description}</p>
                  <h3 className="text-2xl font-semibold text-[#987b53] mb-2">
                    Floor: <span className="text-[#797e82]">{apt.floorNo}</span>
                  </h3>
                  <div className="text-sm space-y-1">
                    <p>Apartment No: <span className="text-[#797e82]">{apt.apartmentNo}</span></p>
                    <p>Block: <span className="text-[#797e82]">{apt.blockName}</span></p>
                    <p>Rent: <span className="text-[#797e82]">{apt.rent} Taka</span></p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleAgreement(apt)}
                    className={`px-4 py-2 rounded-md transition duration-300 cursor-pointer font-bold ${
                      isAgreed
                        ? "bg-gray-400 text-white"
                        : "bg-[#987b53] hover:bg-[#7b613c] text-white"
                    }`}
                  >
                    {isAgreed ? "Agreed" : "Agreement"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2 flex-wrap">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 cursor-pointer rounded border font-medium ${
              currentPage === page + 1
                ? "bg-[#987b53] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartment;




