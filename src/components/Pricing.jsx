import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaCheck, FaTimes } from "react-icons/fa";

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for side projects and small applications",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      { name: "10GB NVMe Storage", included: true },
      { name: "1 vCPU, 2GB RAM", included: true },
      { name: "Free SSL Certificate", included: true },
      { name: "100GB Bandwidth", included: true },
      { name: "Priority Support", included: false },
      { name: "DDoS Protection", included: false },
    ],
    recommended: false,
  },
  {
    name: "Business",
    description: "For growing businesses and production apps",
    monthlyPrice: 89,
    yearlyPrice: 72,
    features: [
      { name: "100GB NVMe Storage", included: true },
      { name: "4 vCPU, 8GB RAM", included: true },
      { name: "Free SSL Certificate", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "Priority Support 24/7", included: true },
      { name: "Advanced DDoS Protection", included: true },
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "For mission-critical applications",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      { name: "1TB NVMe Storage", included: true },
      { name: "8 vCPU, 16GB RAM", included: true },
      { name: "Free SSL Certificate", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "Dedicated Support Manager", included: true },
      { name: "Enterprise DDoS Protection", included: true },
    ],
    recommended: false,
  },
];

function PricingCard({ plan, isYearly, delay }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`relative bg-base-100 border p-6 ${
        plan.recommended
          ? "border-primary"
          : "border-base-300 hover:border-base-content/30"
      } transition-colors`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-content px-3 py-1 text-xs font-medium">
          RECOMMENDED
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-base-content mb-1">
          {plan.name}
        </h3>
        <p className="text-sm text-base-content/60">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-base-content">${price}</span>
          <span className="text-base-content/60">/month</span>
        </div>
        {isYearly && (
          <p className="text-xs text-success mt-1">
            Save 20% with annual billing
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature) => (
          <li key={feature.name} className="flex items-center gap-3 text-sm">
            {feature.included ? (
              <div className="w-5 h-5 bg-primary flex items-center justify-center text-primary-content">
                <FaCheck className="text-xs" />
              </div>
            ) : (
              <div className="w-5 h-5 bg-base-200 flex items-center justify-center text-base-content/40">
                <FaTimes className="text-xs" />
              </div>
            )}
            <span
              className={
                feature.included
                  ? "text-base-content/80"
                  : "text-base-content/40"
              }
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`w-full py-3 font-medium transition-colors ${
          plan.recommended
            ? "bg-primary hover:bg-secondary text-primary-content"
            : "bg-base-200 hover:bg-base-300 text-base-content"
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}

PricingCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    monthlyPrice: PropTypes.number.isRequired,
    yearlyPrice: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        included: PropTypes.bool.isRequired,
      })
    ).isRequired,
    recommended: PropTypes.bool.isRequired,
  }).isRequired,
  isYearly: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
};

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const handleBillingToggle = useCallback((yearly) => {
    setIsYearly(yearly);
  }, []);

  return (
    <section id="pricing" className="py-24 bg-base-200">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-base-content mb-4 tracking-tighter"
          >
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base-content/70 mb-8"
          >
            Choose the plan that fits your needs. No hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center p-1 bg-base-100 border border-base-300"
          >
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                isYearly
                  ? "text-base-content/60 hover:text-base-content"
                  : "bg-base-content text-base-100"
              }`}
              onClick={() => handleBillingToggle(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                isYearly
                  ? "bg-primary text-primary-content"
                  : "text-base-content/60 hover:text-base-content"
              }`}
              onClick={() => handleBillingToggle(true)}
            >
              Yearly <span className="text-xs">-20%</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
