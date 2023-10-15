// PaymentForm.jsx
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to load it in your index.html
      return;
    }

    // Handle payment with Stripe, e.g., create a PaymentMethod, confirm the PaymentIntent
    // You'll need to integrate this with your Stripe backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      <CardElement options={{ /* Customize card element styling */ }} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default PaymentForm;
