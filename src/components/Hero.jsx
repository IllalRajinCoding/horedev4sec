import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaServer,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "200+", label: "Edge Locations" },
  { value: "<10ms", label: "Avg Latency" },
];

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 bg-base-100"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={FADE_IN_UP}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-base-200 border border-base-300 mb-6"
            >
              <span className="w-2 h-2 bg-primary" />
              <span className="text-xs font-medium text-base-content/70">
                Enterprise Cloud Platform
              </span>
            </motion.div>

            <motion.h1
              variants={FADE_IN_UP}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-base-content"
            >
              Cloud Infrastructure{" "}
              <span className="text-primary">Built for Scale</span>
            </motion.h1>

            <motion.p
              variants={FADE_IN_UP}
              className="text-lg text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Deploy applications globally with enterprise-grade security,
              99.99% uptime guarantee, and industry-leading performance.
            </motion.p>

            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <a
                href="#pricing"
                className="px-6 py-3 bg-primary text-primary-content font-medium hover:bg-secondary transition-colors flex items-center gap-2"
              >
                Start Free Trial
                <FaArrowRight className="text-sm" />
              </a>
              <a
                href="#features"
                className="px-6 py-3 font-medium text-base-content border border-base-300 hover:border-primary hover:text-primary transition-colors"
              >
                View Features
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={FADE_IN_UP}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-base-300"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-base-content">
                    {stat.value}
                  </p>
                  <p className="text-sm text-base-content/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-base-200 border border-base-300 p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
                <span className="text-sm font-medium text-base-content/70">
                  Dashboard Overview
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-success" />
                  <span className="text-xs text-base-content/60">
                    All Systems Operational
                  </span>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-base-100 p-4 border border-base-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-primary text-primary-content">
                      <FaServer className="text-sm" />
                    </div>
                    <span className="text-xs font-medium text-success">
                      +12%
                    </span>
                  </div>
                  <p className="text-xs text-base-content/60 mb-1">
                    Total Requests
                  </p>
                  <p className="text-xl font-bold text-base-content">2.4M</p>
                </div>

                <div className="bg-base-100 p-4 border border-base-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-secondary text-secondary-content">
                      <FaShieldAlt className="text-sm" />
                    </div>
                    <span className="text-xs font-medium text-success">
                      -2ms
                    </span>
                  </div>
                  <p className="text-xs text-base-content/60 mb-1">
                    Avg. Latency
                  </p>
                  <p className="text-xl font-bold text-base-content">14ms</p>
                </div>
              </div>

              {/* Activity Chart Placeholder */}
              <div className="bg-base-100 border border-base-300 p-4">
                <p className="text-xs text-base-content/60 mb-4">
                  Request Volume (24h)
                </p>
                <div className="flex items-end justify-between gap-1 h-24">
                  {[35, 55, 45, 70, 60, 75, 50, 90, 85, 65, 70, 80].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                        className="flex-1 bg-primary"
                      />
                    )
                  )}
                </div>
              </div>

              {/* Status List */}
              <div className="mt-4 space-y-2">
                {["API Gateway", "Database Cluster", "CDN Edge"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2 px-3 bg-base-100 border border-base-300"
                  >
                    <span className="text-sm text-base-content/80">{item}</span>
                    <div className="flex items-center gap-2 text-success">
                      <FaCheckCircle className="text-xs" />
                      <span className="text-xs font-medium">Healthy</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
