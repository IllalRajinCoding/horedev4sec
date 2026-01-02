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
      className={`relative bg-white border p-6 ${
        plan.recommended
          ? "border-primary"
          : "border-slate-200 hover:border-slate-300"
      } transition-colors`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 text-xs font-medium">
          RECOMMENDED
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          {plan.name}
        </h3>
        <p className="text-sm text-slate-500">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900">${price}</span>
          <span className="text-slate-500">/month</span>
        </div>
        {isYearly && (
          <p className="text-xs text-green-600 mt-1">
            Save 20% with annual billing
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature) => (
          <li key={feature.name} className="flex items-center gap-3 text-sm">
            {feature.included ? (
              <div className="w-5 h-5 bg-primary flex items-center justify-center text-white">
                <FaCheck className="text-xs" />
              </div>
            ) : (
              <div className="w-5 h-5 bg-slate-100 flex items-center justify-center text-slate-400">
                <FaTimes className="text-xs" />
              </div>
            )}
            <span
              className={feature.included ? "text-slate-700" : "text-slate-400"}
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
            ? "bg-primary hover:bg-secondary text-white"
            : "bg-slate-100 hover:bg-slate-200 text-slate-900"
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
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mb-8"
          >
            Choose the plan that fits your needs. No hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center p-1 bg-white border border-slate-200"
          >
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                isYearly
                  ? "text-slate-600 hover:text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
              onClick={() => handleBillingToggle(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                isYearly
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:text-slate-900"
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
