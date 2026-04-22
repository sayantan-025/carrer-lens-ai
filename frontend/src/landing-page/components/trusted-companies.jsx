import { motion } from "framer-motion";

export default function TrustedCompanies() {
  const companies = [
    "Google", "Meta", "Amazon", "Microsoft", "Netflix", "Airbnb", "Uber", "Stripe", "Spotify", "Lyft"
  ];

  return (
    <section className="mt-20 py-10 relative overflow-hidden ">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
          Candidates placed at industry leaders
        </p>
      </div>

      <div className="flex overflow-hidden relative">
        <motion.div 
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{
            x: [0, -1035],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...companies, ...companies, ...companies].map((company, index) => (
            <span 
              key={index} 
              className="text-2xl md:text-3xl font-bold text-white/50 hover:text-blue-500/40 transition-colors cursor-default select-none transition-all"
            >
              {company}
            </span>
          ))}
        </motion.div>

        {/* Gradient Fades for Smooth Edges */}
     
      </div>
    </section>
  );
}
