import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FaBolt,
  FaShieldAlt,
  FaGlobe,
  FaDatabase,
  FaHeadset,
  FaLock,
  FaCode,
} from "react-icons/fa";

const MAIN_FEATURES = [
  {
    Icon: FaBolt,
    title: "Lightning Performance",
    description:
      "NVMe SSDs and high-frequency CPUs ensure your applications run at peak performance with sub-10ms latency.",
    size: "large",
  },
  {
    Icon: FaShieldAlt,
    title: "Enterprise Security",
    description:
      "ISO 27001 certified data centers with advanced DDoS protection and automated firewalls.",
    size: "tall",
    extras: [
      { Icon: FaLock, text: "End-to-End Encryption" },
      { Icon: FaShieldAlt, text: "WAF Protection" },
      { Icon: FaCode, text: "Auto Security Patches" },
    ],
  },
  {
    Icon: FaGlobe,
    title: "Global Edge Network",
    description:
      "Deploy close to your users with 200+ points of presence worldwide.",
    size: "medium",
  },
  {
    Icon: FaDatabase,
    title: "Managed Databases",
    description:
      "Automated backups, scaling, and maintenance for PostgreSQL, MySQL, and MongoDB.",
    size: "medium",
  },
];

function FeatureCard({ Icon, title, description, size, extras, delay = 0 }) {
  const sizeClasses = {
    large: "md:col-span-2",
    tall: "md:row-span-2",
    medium: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`bg-base-100 border border-base-300 p-6 hover:border-primary transition-colors ${sizeClasses[size]}`}
    >
      <div className={size === "tall" ? "h-full flex flex-col" : ""}>
        {/* UPDATED: Standarisasi ukuran container (48x48px) dan icon (24px) */}
        <div
          className="bg-primary flex items-center justify-center text-primary-content mb-4"
          style={{ width: 48, height: 48 }}
        >
          <Icon style={{ width: 24, height: 24 }} />
        </div>

        <h3 className="text-lg font-semibold text-base-content mb-2">
          {title}
        </h3>
        <p className="text-sm text-base-content/70 mb-4">{description}</p>

        {extras && (
          <div className="mt-auto pt-4 border-t border-base-300 space-y-3">
            {extras.map(({ Icon: ExtraIcon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-sm text-base-content/80"
              >
                {/* UPDATED: Standarisasi ukuran icon list (24px) agar sama dengan icon utama */}
                <ExtraIcon
                  className="text-primary flex-shrink-0"
                  style={{ width: 24, height: 24 }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

FeatureCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["large", "tall", "medium"]).isRequired,
  extras: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.elementType.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  delay: PropTypes.number,
};

function Features() {
  return (
    <section id="features" className="py-24 bg-base-100">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 bg-base-200 border border-base-300 text-primary text-xs font-medium mb-4"
          >
            Platform Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-base-content mb-4"
          >
            Everything You Need to{" "}
            <span className="text-primary">Scale Globally</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base-content/70 max-w-2xl mx-auto"
          >
            Built for high-performance applications that demand reliability,
            security, and speed.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {MAIN_FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-base-200 border border-base-300 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            {/* UPDATED: Standarisasi ukuran container (48x48px) dan icon (24px) agar sama dengan FeatureCard */}
            <div
              className="bg-primary flex items-center justify-center text-primary-content mb-4 md:mb-0"
              style={{ width: 48, height: 48 }}
            >
              <FaHeadset style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-base-content">
                24/7 Expert Support
              </h3>
              <p className="text-sm text-base-content/70">
                Our engineers are ready to help you solve any infrastructure
                challenge.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-primary text-primary-content px-6 py-3 font-medium hover:bg-secondary transition-colors whitespace-nowrap"
          >
            Contact Sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
