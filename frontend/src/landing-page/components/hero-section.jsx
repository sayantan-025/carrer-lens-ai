import { PlayCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <>
      <motion.div
        className="fixed inset-0 overflow-hidden -z-20 pointer-events-none"
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
         <div className="absolute rounded-full bottom-0 right-0 size-130 bg-blue-950 blur-[180px] opacity-40" />
<div className="absolute rounded-full bottom-0 -left-10 size-96 bg-slate-900 blur-[160px] opacity-35" />
<div className="absolute rounded-full top-32 left-1/2 -translate-x-1/2 size-[500px] bg-blue-900 blur-[180px] opacity-25" />
        </div>
      </motion.div>
      <motion.section className="flex flex-col items-center pt-32 pb-16">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 320,
            damping: 70,
            mass: 1,
          }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-900"
                src={`https://i.pravatar.cc/150?u=${i + 10}`}
                alt="User avatar"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-300">
            Trusted by 2,000+ job seekers
          </p>
        </motion.div>

        <motion.h1
          className="text-center text-5xl/13 md:text-7xl/19 font-bold tracking-tight max-w-4xl px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          Master Your Next Interview with <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">AI Precision</span>.
        </motion.h1>

        <motion.p
          className="text-center text-gray-300 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 320,
            damping: 70,
            mass: 1,
          }}
        >
          Stop guessing. Get personalized interview reports, professional resumes, 
          and AI-driven insights tailored to your target job description.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <Link 
            to="/register" 
            className="group btn btn-primary px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 border-none flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="btn glass px-8 py-4 text-lg flex items-center gap-2 hover:bg-white/10 transition-all">
            <PlayCircle className="size-5" />
            See How it Works
          </button>
        </motion.div>

        <motion.div
          className="mt-20 w-full max-w-5xl px-4 relative"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 glass shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
              alt="Career Lens AI Dashboard" 
              className="w-full h-auto object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-6 items-center justify-center sm:justify-start">
              {[
                "AI Resume Analysis",
                "Mock Interview Questions",
                "ATS-Friendly Resumes",
                "Gap Analysis"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-white/90 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  <CheckCircle2 className="size-4 text-blue-400" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
