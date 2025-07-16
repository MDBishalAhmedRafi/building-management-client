import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run when email exists
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-4 md:p-10 max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-[#987b53]">
        My Payment History
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-center">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-[#987b53] text-white">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id}>
                  <td>{idx + 1}</td>
                  <td className="text-sm">{payment.transactionId}</td>
                  <td>{payment.month}</td>
                  <td>${payment.paidAmount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentHistory;
