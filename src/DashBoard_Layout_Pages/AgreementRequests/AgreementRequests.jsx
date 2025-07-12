import React, { useEffect } from "react";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../Main_Layout_Pages/Loading/Loading";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreements/requests");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action, email }) => {
      return axiosSecure.patch(`/agreements/requests/${id}`, {
        action,
        userEmail: email,
      });
    },
    onSuccess: () => {
      toast.success("Request updated successfully");
      queryClient.invalidateQueries(["agreementRequests"]);
    },
    onError: () => {
      toast.error("Failed to update request");
    },
  });

  const handleAction = (id, action, email) => {
    Swal.fire({
      title: `${action === "accept" ? "Accept" : "Reject"} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, action, email });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-[#987b53] mb-10"
        data-aos="fade-down"
      >
        Agreement Requests
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg" data-aos="fade-up">
        <table className="table w-full">
          <thead className="bg-[#f8f1e5] text-[#987b53] text-sm md:text-base">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Apartment</th>
              <th>Rent</th>
              <th>Request Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id} className="hover:bg-orange-50">
                <td>{index + 1}</td>
                <td>
                  <p className="font-semibold">{req.userName}</p>
                  <p className="text-sm text-gray-500">{req.email}</p>
                </td>
                <td className="text-gray-500">
                  <span>Floor: {req.floor}</span>, <span>Block: {req.block}</span>,{" "}
                  <span>Room: {req.apartmentNo}</span>
                </td>
                <td className="text-gray-500">${req.rent}</td>
                <td className="text-gray-500">{new Date(req.agreementTime).toLocaleDateString()}</td>
                <td className="flex gap-2 justify-center items-center">
                  <button
                    onClick={() => handleAction(req._id, "accept", req.email)}
                    className="btn btn-xs md:btn-sm bg-green-600 text-white hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "reject", req.email)}
                    className="btn btn-xs md:btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequests;
