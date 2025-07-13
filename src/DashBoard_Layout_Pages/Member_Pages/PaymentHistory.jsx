import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">Payment History</h2>
      <table className="table table-zebra w-full min-w-[350px]">
        <thead>
          <tr>
            <th>#</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay, index) => (
            <tr key={pay._id}>
              <td>{index + 1}</td>
              <td>{pay.month}</td>
              <td>${pay.amount}</td>
              <td>{new Date(pay.date).toLocaleDateString()}</td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default PaymentHistory;
