import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import toast from "react-hot-toast";
import { useCart } from "../../../../Hooks/useCart";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";


const PaymentForm = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { amountInCents, subTotalRounded, cartItems, setCartItems } = useCart();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();


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
    );
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
      const paymentData = {
        email: user?.email || "N/A",
        amount: subTotalRounded,
        transactionId: transactionId,
        paymentMethod: paymentIntent.payment_method_types,
        paymentItem: cartItems.cartItemInfo,
        paymentStatus: "Paid",
        orderDate: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }),
        orderStatus: "Recieved",
      };
      const paymentRes = await axiosSecure.post("/payments", paymentData);
      if (paymentRes.data.insertedId) {
        // Show SweetAlert with transaction ID
        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          buttonsStyling: false,
          color: "#000000",
          customClass: {
            popup: "premium-bg",
            confirmButton:
              "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:bg-yellow-500  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
            cancelButton:
              "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
          },
          confirmButtonText: "Ok",
        });
        // Clear cart items after successful payment
        setCartItems({
          userEmail: user?.email || "",
          cartItemInfo: [],
        })
        console.log(user?.email,'this is user email')
        if(user?.email){
           await axiosSecure.delete(`/api/cart/clear/${user?.email}`);
          
        }
        
        //update pet quantity
      }
    }
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
          ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FFDC26] hover:bg-[#e6c920] text-[#111111]"
          }`}
      >
        {processing ? "Processing..." : `Pay Now $${subTotalRounded}`}
      </button>
      {error && (
        <p className="text-center text-sm text-red-600 font-medium">{error}</p>
      )}
    </form>
  );
};

export default PaymentForm;
