import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../Main_Layout_Pages/Loading/Loading";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  // ✅ Fetch coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // ✅ Add coupon
  const addCouponMutation = useMutation({
    mutationFn: async (newCoupon) => {
      newCoupon.available = true; // Set default availability
      const res = await axiosSecure.post("/coupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Coupon added successfully!");
      queryClient.invalidateQueries(["coupons"]);
      setShowModal(false);
      reset();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add coupon.");
    },
  });

  // ✅ Toggle availability
  const toggleAvailability = useMutation({
    mutationFn: async ({ id, available }) => {
      const res = await axiosSecure.put(`/coupons/${id}/availability`, { available });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      toast.success("Coupon status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Add this coupon?",
      text: `${data.couponCode} - ${data.discountPercentage}%`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
    }).then((result) => {
      if (result.isConfirmed) {
        addCouponMutation.mutate(data);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#987b53]">Manage Coupons</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
          data-aos="zoom-in"
        >
          + Add Coupon
        </button>
      </div>

      {/* ✅ Coupon Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-[#987b5380]" data-aos="fade-up">
        <table className="table w-full text-sm text-left">
          <thead className="bg-orange-200 text-gray-800">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount (%)</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id} className="border-b transition">
                <td className="p-4 ">{index + 1}</td>
                <td className="p-4 font-medium">{coupon.couponCode}</td>
                <td className="p-4 ">{coupon.discountPercentage}%</td>
                <td className="p-4">{coupon.description}</td>
                <td className="p-4 text-center">
                  <span
                    className={`badge ${
                      coupon.available ? "badge-success" : "badge-error"
                    }`}
                  >
                    {coupon.available ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      toggleAvailability.mutate({
                        id: coupon._id,
                        available: !coupon.available,
                      })
                    }
                    className={`btn btn-xs ${
                      coupon.available ? "btn-error" : "btn-success"
                    }`}
                  >
                    {coupon.available ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <Loading />}
      </div>

      {/* ✅ Add Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            data-aos="zoom-in"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-center mb-4 text-[#987b53]">Add New Coupon</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("couponCode", { required: true })}
                type="text"
                placeholder="Coupon Code"
                className="input input-bordered w-full"
              />
              <input
                {...register("discountPercentage", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                  max: 100,
                })}
                type="number"
                placeholder="Discount Percentage"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Coupon Description"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button type="submit" className="btn bg-[#987b53] w-full">
                Submit Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
