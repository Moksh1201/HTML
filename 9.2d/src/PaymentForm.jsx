import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionOption from "./SubscriptionOption";

const stripePromise = loadStripe("pk_test_51O2ZkNSCIg3CTOdnyBPcG5RHKK3RvzuCK6QMR1uMNbuiO18ZeaP1DiXfJ0Qty4vds25OknNjrX94yqWsOjb7RQiq00vDSKE1KF");

function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionOption />
      {/* Other components related to payment */}
    </Elements>
  );
}

export default PaymentForm;
