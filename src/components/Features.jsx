import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Data tanpa Icon. Fokus pada konten teks.
const MAIN_FEATURES = [
  {
    category: "Performance",
    title: "Zero Latency",
    description: "Optimized for speed with NVMe storage and edge computing logic close to the user.",
    size: "large", // Spans 2 cols
    visualType: "metric",
    metric: "10ms",
    metricDetail: "Global average response time",
  },
  {
    category: "Security",
    title: "Shielded Infrastructure",
    description: "Enterprise-grade protection baked into every deployment layer.",
    size: "tall", // Spans 2 rows
    visualType: "code", // Menampilkan list seperti kode
    extras: ["E2E Encryption", "Auto-WAF Rules", "DDoS Mitigation", "ISO 27001"],
  },
  {
    category: "Network",
    title: "Edge Network",
    description: "Instant deployment to 200+ regions worldwide.",
    size: "medium",
    visualType: "metric",
    metric: "200+",
    metricDetail: "Points of Presence",
  },
  {
    category: "Reliability",
    title: "Uptime SLA",
    description: "Redundant systems ensuring your data is always available.",
    size: "medium",
    visualType: "metric",
    metric: "99.99%",
    metricDetail: "Guaranteed Availability",
  },
];

function FeatureCard({
  category,
  title,
  description,
  size,
  visualType,
  extras,
  metric,
  metricDetail,
  delay = 0,
}) {
  const sizeClasses = {
    large: "md:col-span-2",
    tall: "md:row-span-2 h-full",
    medium: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`group relative flex flex-col p-8 rounded-xl bg-base-100 border border-base-content/10 hover:border-base-content/30 transition-colors duration-300 overflow-hidden ${sizeClasses[size]}`}
    >
      {/* Background Gradient Halus (Vercel Style) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-base-content/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Label (Monospace) */}
      <div className="mb-6 flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-base-content/20 group-hover:bg-primary transition-colors duration-300" />
         <span className="text-xs font-mono uppercase tracking-widest text-base-content/50">
           {category}
         </span>
      </div>

      {/* Main Typography */}
      <div className="relative z-10 mb-auto">
        <h3 className="text-2xl font-semibold text-base-content mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-base-content/60 leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Visual Section: METRIC or CODE list */}
      <div className="relative z-10 mt-12">
        
        {/* Type 1: Massive Metric (Typographic Art) */}
        {visualType === "metric" && (
          <div>
            <span className="block text-6xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-base-content to-base-content/20">
              {metric}
            </span>
            <span className="block mt-2 text-xs font-mono text-base-content/40 border-t border-base-content/10 pt-2 inline-block pr-4">
              {metricDetail}
            </span>
          </div>
        )}

        {/* Type 2: Code/Terminal List */}
        {visualType === "code" && (
          <div className="bg-base-200/50 rounded-lg p-4 font-mono text-xs border border-base-content/5">
            <div className="flex gap-1.5 mb-3 border-b border-base-content/5 pb-2">
               <div className="w-2 h-2 rounded-full bg-base-content/20"></div>
               <div className="w-2 h-2 rounded-full bg-base-content/20"></div>
            </div>
            <div className="space-y-2 text-base-content/70">
              {extras.map((item, i) => (
                <div key={i} className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-base-content/30 select-none">0{i + 1}</span>
                  <span className="text-primary/80">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

FeatureCard.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.string,
  visualType: PropTypes.string,
  extras: PropTypes.array,
  metric: PropTypes.string,
  metricDetail: PropTypes.string,
  delay: PropTypes.number,
};

function Features() {
  return (
    <section className="py-32 bg-base-100 text-base-content">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header - Left Aligned, Clean */}
        <div className="mb-24 border-b border-base-content/10 pb-8" id="features">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold tracking-tighter mb-4"
          >
            Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Future.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-base-content/60 max-w-2xl font-light"
          >
            High-performance primitives for modern applications. 
            No icons, no clutter—just raw power.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MAIN_FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;