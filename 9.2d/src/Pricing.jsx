import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionOption from "./SubscriptionOption";


// Load your Stripe public key once in Pricing.js
const stripePromise = loadStripe("pk_test_51O2ZkNSCIg3CTOdnyBPcG5RHKK3RvzuCK6QMR1uMNbuiO18ZeaP1DiXfJ0Qty4vds25OknNjrX94yqWsOjb7RQiq00vDSKE1KF");

const Pricing = () => {
  const handleSubscribe = (priceId) => {
    // Handle subscription logic here
  };

  return (
    <div>
      <h1>Subscription Plans</h1>
      <Elements stripe={stripePromise}>
        <SubscriptionOption
          priceId="price_1abcdefg" 
          onSubscribe={handleSubscribe}
        />
      </Elements>
    </div>
  );
};

export default Pricing;
