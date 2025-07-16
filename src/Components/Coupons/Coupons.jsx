// src/Components/Home/Coupons.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";

const Coupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10  text-lg">
        Loading coupons...
      </div>
    );
  }

  return (
    <section className="py-14 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#ae825b]">
Exclusive Coupons Just for You!
      </h2>

      {coupons.length === 0 ? (
        <p className="text-center ">No coupons available now.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-orange-200 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold">Coupon Code</span>
                  <span className="text-xs ">
                    {new Date(coupon.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#ae825b] tracking-wide">
                  {coupon.couponCode}
                </h3>

                <p className="text-md ">
                  Get{" "}
                  <span className="font-semibold text-[#ae825b]">
                    {coupon.discountPercentage}% off
                  </span>
                </p>

                <p className="text-sm ">{coupon.description}</p>

                <button
                  className="mt-4 bg-[#ae825b80] hover:bg-[#ae825b] cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition"
                  onClick={() => navigator.clipboard.writeText(coupon.couponCode)}
                >
                  Copy Code
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Coupons;
