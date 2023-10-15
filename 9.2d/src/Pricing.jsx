import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionOption from "./SubscriptionOption";
import "./Pricing.css"; 
const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

const Pricing = () => {
  const handleSubscribe = (priceId) => {
    // Redirect to the payment page with the selected priceId
    // You can use React Router for navigation
  };

  return (
    <div>
      <h1>Subscription Plans</h1>
      <Elements stripe={stripePromise}>
        <SubscriptionOption
          priceId="price_1abcdefg" // Replace with your Stripe price IDs
          onSubscribe={handleSubscribe}
        />
        <SubscriptionOption
          priceId="price_2hijklmn" // Replace with your Stripe price IDs
          onSubscribe={handleSubscribe}
        />
      </Elements>
    </div>
  );
};

export default Pricing;
