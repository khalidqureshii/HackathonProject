// src/DonationForm.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FadeLoader from "react-spinners/ClipLoader";

const DonationPage = () => {
    const location = useLocation();
  let { title } = location.state || "Unknown"; 
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    const cardElement = elements.getElement(CardElement);
    setLoading(true); // Start loading when donation process begins

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setSuccess(null);
      setLoading(false); // Stop loading in case of an error
    } else {
      setError(null);
      handlePayment(paymentMethod.id);
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

  const handlePayment = async (paymentMethodId) => {
    const response = await fetch(
      "http://localhost:5000/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId, amount: amount * 100 }), // Amount in cents
      }
    );

    const paymentResult = await response.json();
    if (paymentResult.error) {
      setError(paymentResult.error);
      setLoading(false); // Stop loading if there's an error
    } else {
      setSuccess("Donation successful!");
      setAmount("");
      setLoading(false); // Stop loading after success

      // Set a timeout to clear the success message after 2 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  };

  console.log(title);

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
        {(title != "Unknown") ? (<h1 className="text-2xl font-semibold mb-4 text-gray-800">Donation for: {title}</h1>): (<></>)}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Pay with Card
        </h2>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-800 text-sm font-semibold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder=""
            className="ring-[1px] ring-gray-300 shadow-md rounded-md p-2 mb-2 w-full mt-1"
            required
          />
        </div>
        <label htmlFor="amount" className="text-gray-800 text-sm font-semibold">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount"
          required
          className="ring-[1px] ring-gray-300 focus:ring-yellow-400 shadow-md rounded-md p-2 mb-4 w-full mt-1"
        />
        <label
          htmlFor="cardInfo"
          className="text-gray-800 text-sm font-semibold subpixel-antialiased"
        >
          Card Information
        </label>
        <CardElement className="ring-1 ring-gray-300 mt-2 rounded-md p-2 mb-4" />
        <button
          type="submit"
          disabled={!stripe || loading} // Disable button while loading
          className={`w-full py-2 text-white rounded-md ${
            loading
              ? "bg-blue-500"
              : stripe
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400"
          } transition duration-200`}
        >
          {loading ? (
            <FadeLoader
              color="black"
              loading={loading}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Donate"
          )}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-500 mt-4">{success}</div>}
      </form>
    </div>
    </>
  );
};

export default DonationPage;