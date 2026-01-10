import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCloud,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

// --- DATA LINKS (Original) ---
const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "API", href: "#features" },
    { label: "Documentation", href: "#features" },
  ],
  Company: [
    { label: "About", href: "#home" },
    { label: "Blog", href: "#home" },
    { label: "Careers", href: "#contact" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#home" },
    { label: "Terms of Service", href: "#home" },
    { label: "Security", href: "#features" },
  ],
};

const SOCIAL_LINKS = [
  {
    Icon: FaGithub,
    href: "https://github.com/IllalRajinCoding",
    label: "GitHub",
  },
  {
    Icon: FaTwitter,
    href: "https://twitter.com/IllalRajinCoding",
    label: "Twitter",
  },
  {
    Icon: FaLinkedin,
    href: "https://linkedin.com/in/robbanie-hillaly-kurniadien",
    label: "LinkedIn",
  },
  { Icon: FaEnvelope, href: "mailto:admin@horedev4sec.biz.id", label: "Email" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(""); // Untuk menangkap pesan dari Elysia

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.horedev4sec.biz.id/api/subscribe",
        { email: email },
      );

      if (response.data.success) {
        setStatus("success");
        setMessage("Thanks for subscribing to our newsletter.");
        setEmail("");
      }
    } catch (error) {
      setStatus("error");
      // Menangkap pesan rate limit: "Slow bang..." atau "Email ini sudah mencoba..."
      const serverMsg =
        error.response?.data?.message ||
        error.response?.data ||
        "Something went wrong.";
      setMessage(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-base-200 text-base-content pt-16 pb-8 relative"
    >
      {/* --- ALERT NOTIFICATION (Disesuaikan agar tidak nabrak Navbar) --- */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // top-20 memberikan jarak aman di bawah Navbar (h-16)
            // z-[60] memastikan dia di atas Navbar (z-50)
            className="fixed top-20 right-6 z-60 w-full max-w-sm px-4 md:px-0"
          >
            {status === "success" ? (
              <div className="alert alert-success shadow-2xl border-none grid-flow-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm">Success!</span>
                  <span className="text-xs">{message}</span>
                </div>
                <button
                  onClick={() => setStatus(null)}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="alert alert-error shadow-2xl border-none text-white grid-flow-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm">Error!</span>
                  <span className="text-xs">{message}</span>
                </div>
                <button
                  onClick={() => setStatus(null)}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* --- BRAND SECTION (Original) --- */}
          <div className="md:col-span-4">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-content">
                <FaCloud className="text-sm" />
              </div>
              <span className="text-lg font-semibold">
                Hore<span className="text-primary">Cloud</span>
              </span>
            </a>
            <p className="text-base-content/60 text-sm mb-6 max-w-xs">
              Enterprise cloud infrastructure for modern businesses. Deploy
              globally with confidence.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-base-300 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-base-100 transition-colors rounded-full"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* --- LINKS NAVIGATION (Original) --- */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-base-content/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* --- NEWSLETTER SECTION (Original) --- */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-base-content/60 mb-4">
              Subscribe for product updates.
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-base-100 border border-base-300 px-4 py-2 text-sm text-base-content focus:outline-none focus:border-primary rounded disabled:opacity-50"
                disabled={loading || status === "success"}
              />
              <button
                type="submit"
                disabled={loading || status === "success"}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded ${
                  status === "success"
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-primary text-primary-content hover:bg-secondary"
                }`}
              >
                {loading
                  ? "..."
                  : status === "success"
                    ? "Joined!"
                    : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/50">
          <p>© 2026 HoreCloud. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#home">Privacy</a>
            <a href="#home">Terms</a>
            <a href="#home">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
