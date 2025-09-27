import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    // Fake delay for simulation (2s)
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment Successful!");
    }, 2000);
  };

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
          ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFDC26] hover:bg-[#e6c920] text-[#111111]"}`}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
