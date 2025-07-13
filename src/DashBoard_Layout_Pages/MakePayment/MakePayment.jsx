import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [apartment, setApartment] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800 });
    // Fetch user's agreement data
    if (user?.email) {
      axiosSecure.get(`/agreements/user/${user.email}`).then((res) => {
        if (res.data.length) {
          setApartment(res.data[0]);
          setValue("email", user.email);
          setValue("floor", res.data[0].floor);
          setValue("block", res.data[0].blockName);
          setValue("room", res.data[0].apartmentNo);
          setValue("rent", res.data[0].rent);
        }
      });
    }
  }, [user, axiosSecure, setValue]);

  const handleCouponApply = async () => {
    if (!couponCode) return toast.error("Enter a coupon code first");
    try {
      const res = await axiosSecure.get("/coupons");
      const valid = res.data.find((c) => c.couponCode === couponCode);
      if (valid) {
        setDiscount(valid.discountPercentage);
        toast.success(`Coupon applied: ${valid.discountPercentage}% off`);
      } else {
        toast.error("Invalid coupon code");
        setDiscount(0);
      }
    } catch {
      toast.error("Failed to check coupon");
    }
  };

  const onSubmit = (data) => {
    const rent = parseFloat(data.rent);
    const finalAmount = discount > 0 ? rent - (rent * discount) / 100 : rent;

    // You can send `finalAmount` to Stripe Checkout or your payment page
    localStorage.setItem("paymentData", JSON.stringify({ ...data, finalAmount }));
    navigate("/dashboard/payment-checkout"); // Replace with actual route
  };

  return (
    <motion.div
      className="p-4 md:p-10 max-w-4xl mx-auto bg-white shadow-md rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold text-center text-[#987b53] mb-6">Make Payment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input {...register("email")} readOnly className="input input-bordered w-full" />
        <input {...register("floor")} readOnly className="input input-bordered w-full" />
        <input {...register("block")} readOnly className="input input-bordered w-full" />
        <input {...register("room")} readOnly className="input input-bordered w-full" />
        <input {...register("rent")} readOnly className="input input-bordered w-full" />

        <input
          {...register("month", { required: true })}
          placeholder="Enter month (e.g., July 2025)"
          className="input input-bordered w-full"
        />
        {errors.month && <p className="text-red-500 text-sm">Month is required</p>}

        {/* Coupon Field */}
        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon Code"
            className="input input-bordered flex-grow"
          />
          <button
            type="button"
            onClick={handleCouponApply}
            className="btn btn-outline btn-sm"
          >
            Apply Coupon
          </button>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button className="btn btn-primary w-full" type="submit">
            Pay Now
          </button>
          {discount > 0 && (
            <p className="text-green-600 text-center mt-2">
              Coupon Applied: <strong>{discount}% off</strong>
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default MakePayment;
