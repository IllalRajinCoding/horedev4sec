import {
  FaCloud,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

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
  { Icon: FaGithub, href: "https://github.com/IllalRajinCoding", label: "GitHub" },
  { Icon: FaTwitter, href: "https://twitter.com/IllalRajinCoding", label: "Twitter" },
  { Icon: FaLinkedin, href: "https://linkedin.com/in/robbanie-hillaly-kurniadien", label: "LinkedIn" },
  { Icon: FaEnvelope, href: "admin@horedev4sec.biz.id", label: "Email" },
];

function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
                <FaCloud className="text-sm" />
              </div>
              <span className="text-lg font-semibold">
                Hore<span className="text-primary">Cloud</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Enterprise cloud infrastructure for modern businesses. Deploy
              globally with confidence.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-700 transition-colors"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe for product updates and cloud infrastructure tips.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>2026 HoreCloud. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#home" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#home" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
