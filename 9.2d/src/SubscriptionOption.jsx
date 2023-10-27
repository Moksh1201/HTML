import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionOptions = () => {
  const freePlan = {
    title: "Basic Plan",
    price: 1,
    currency: "₹",
    description: "Access basic articles and updates for free.",
    subscribeLink: "https://buy.stripe.com/test_fZe2b5cto3CpcRG3cc",
  };

  const premiumPlan1 = {
    title: "Premium Plan A",
    price: 49.99,
    currency: "₹",
    description: "Get unlimited access to premium articles and daily updates.",
    subscribeLink: "https://buy.stripe.com/test_fZe3f90KGc8V9Fu6op",
  };

  const premiumPlan2 = {
    title: "Premium Plan B",
    price: 149.99,
    currency: "₹",
    description: "Unlock premium articles, daily updates, and exclusive content.",
    subscribeLink: "https://buy.stripe.com/test_fZe02Xdxs6OB5pe28a",
  };

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <SubscriptionCard {...freePlan} />
        <SubscriptionCard {...premiumPlan1} />
        <SubscriptionCard {...premiumPlan2} />
      </div>
    </div>
  );
};

export default SubscriptionOptions;
