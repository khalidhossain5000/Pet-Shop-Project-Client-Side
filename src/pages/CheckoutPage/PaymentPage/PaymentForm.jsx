import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
import { useCart } from "../../../../Hooks/useCart";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const PaymentForm = () => {
  const [processing, setProcessing] = useState(false);
  const [error,setError]=useState("")
  const stripe = useStripe();
  const elements = useElements();
  const { amountInCents,subTotalRounded } = useCart();
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    // Step 1: Create payment intent on backend
    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
    });

    const clientSecret = data.clientSecret;

    // Step 2: Confirm Card Payment
    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName, // get from user context or form
            email: user?.email,
          },
        },
      }
    )
     if (error) {
        setError(error);
        setProcessing(false);
        return;
      }

    if (paymentIntent.status === "succeeded") {
        setError("");
        setProcessing(false);
        //PAYMENT INFO SENDING TO THE DB START
        const transactionId = paymentIntent.id;
        // step-4 mark parcel paid also create payment history
        // const paymentData = {
        //   premiumDuration: duration,
        //   email: user.email,
        //   amount,
        //   transactionId: transactionId,
        //   paymentMethod: paymentIntent.payment_method_types,
        // };
        console.log(transactionId,error)
    }
  };
  console.log('this is error',error)
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-semibold text-[#111111] mb-2">
          Card Details
        </label>
        <div className="p-4 border-2 border-gray-200 rounded-xl shadow-sm bg-[#FFF9F4]">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111111",
                  "::placeholder": { color: "#a0a0a0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className={`w-full py-3 rounded-xl font-bold shadow-md transition 
          ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FFDC26] hover:bg-[#e6c920] text-[#111111]"
          }`}
      >
        {processing ? "Processing..." : `Pay Now $${subTotalRounded}`}
      </button>
    </form>
  );
};

export default PaymentForm;
