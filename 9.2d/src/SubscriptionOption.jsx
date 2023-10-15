import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SubscriptionOption = ({ priceId, onSubscribe }) => {
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

    // Once payment is successful, call onSubscribe with the selected priceId
    onSubscribe(priceId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Subscription Option</h2>
      <div className="subscription-option">
        {/* Render subscription details, e.g., plan name, price, features */}
      </div>
      <div className="subscription-payment">
        <CardElement options={{ /* Customize card element styling */ }} />
        <button type="submit" disabled={!stripe}>
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default SubscriptionOption;
