import React, { useEffect, useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../Hooks/UseAxios/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/UseAuth/UseAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Read payment data passed via localStorage
  const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
  const amount = paymentData.finalAmount || 0;

  // Create payment intent on backend and get clientSecret
  useEffect(() => {
    if (amount) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => setError("Failed to initialize payment."));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!stripe || !elements || !clientSecret) {
      setError("Payment system not ready");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found");
      return;
    }

    setProcessing(true);

    // Create payment method
    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    // Confirm card payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    // Handle successful payment
    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        email: paymentData.email,
        floor: paymentData.floor,
        block: paymentData.block,
        room: paymentData.room,
        rent: paymentData.rent,
        paidAmount: amount,
        month: paymentData.month,
        date: new Date(),
        transactionId: paymentIntent.id,
      };

      try {
        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: `Transaction ID: ${paymentIntent.id}`,
          });
          localStorage.removeItem("paymentData");
          navigate("/member-dashboard/payment-history");
        } else {
          setError("Failed to save payment information.");
        }
      } catch {
        setError("Error saving payment information.");
      }
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded shadow mt-10">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#32325d" },
              invalid: { color: "#fa755a" },
            },
          }}
        />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
