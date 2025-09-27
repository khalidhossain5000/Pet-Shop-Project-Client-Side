import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F4] flex flex-col">
      {/* ✅ Radial Gradient Banner */}
      <div className="relative h-72 flex items-center justify-center text-center rounded-b-3xl shadow-lg bg-[radial-gradient(circle_at_center,_#FFDC26_0%,_#FFF9F4_60%,_#FFFFFF_100%)]">
        <div className="absolute inset-0 bg-black/10 rounded-b-3xl"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111] drop-shadow-sm">
            Secure Checkout
          </h1>
          <p className="mt-3 text-lg md:text-xl text-[#111111]/80 font-medium">
            Premium experience with safe & reliable payment
          </p>
        </div>
      </div>

      {/* ✅ Payment Form Section */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-[#111111]">
            Complete Your Payment
          </h2>

          {/* Stripe Wrapper */}
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
