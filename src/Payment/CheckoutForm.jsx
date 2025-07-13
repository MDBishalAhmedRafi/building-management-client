import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { useAuth } from "../../Hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ selectedApartment, price, month }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment Method Error:", error);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      }
    );

    if (confirmError) {
      console.error("Confirm Payment Error:", confirmError);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        amount: price,
        date: new Date(),
        floor: selectedApartment?.floor || "N/A",
        block: selectedApartment?.block || "N/A",
        apartment: selectedApartment?.roomNo || "N/A",
        month,
      };

      const res = await axiosSecure.post("/payments", payment);

      if (res.data?.insertedId) {
        Swal.fire({
          title: "Payment Successful!",
          html: `
            <div style="text-align: left;">
              <p><strong>Amount:</strong> $${price}</p>
              <p><strong>Email:</strong> ${user?.email}</p>
              <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
              <p><strong>Room:</strong> ${selectedApartment?.roomNo || "N/A"}</p>
              <p><strong>Month:</strong> ${month}</p>
            </div>
          `,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#987b53",
        });
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white rounded-xl shadow-lg">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              '::placeholder': {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="mt-6 w-full bg-[#987b53] text-white py-2 rounded-md hover:bg-[#a6895b] transition"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
