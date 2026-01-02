import { motion } from "framer-motion";
import {
  FaAmazon,
  FaGoogle,
  FaMicrosoft,
  FaSlack,
  FaDropbox,
  FaStripe,
} from "react-icons/fa";

const PARTNERS = [
  { name: "Amazon", Icon: FaAmazon },
  { name: "Google", Icon: FaGoogle },
  { name: "Microsoft", Icon: FaMicrosoft },
  { name: "Slack", Icon: FaSlack },
  { name: "Dropbox", Icon: FaDropbox },
  { name: "Stripe", Icon: FaStripe },
];

function Partnership() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 font-medium mb-8"
        >
          Trusted by leading companies worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {PARTNERS.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Icon className="text-2xl" />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Partnership;
