import { motion } from "framer-motion";
import SectionTitle from "./section-title";
import { ExternalLink, Sparkles, Target, FileCheck } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Sparkles,
    title: "Upload Your Profile",
    description:
      "Upload your existing resume or describe your professional experience. Our AI extracts your key skills, achievements, and career history in seconds.",
    link: "/register",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 2,
    icon: Target,
    title: "Add Job Description",
    description:
      "Paste the job description for your target role. Career Lens AI performs a deep analysis to find exact matches and identifies critical skill gaps.",
    link: "/register",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2342&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: FileCheck,
    title: "Get Your Career Report",
    description:
      "Receive a detailed match report, personalized interview questions (technical & behavioral), and a professional ATS-friendly resume ready for download.",
    link: "/register",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=2340&auto=format&fit=crop",
  },
];

export default function WorkflowSteps() {
  return (
    <section className="mt-32 relative">
      <SectionTitle
        title="Your journey to a dream job starts here."
        description="Follow our simple three-step process to transform your job search with AI-powered insights."
      />

      <div className="relative space-y-20 md:space-y-32 mt-20 max-w-6xl mx-auto px-6">
        {/* Connection Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/10 hidden md:block" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-between gap-12 md:gap-24 ${
              index % 2 !== 0 ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"
            }`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Image Container */}
            <div className="flex-1 w-full group relative">
              <div className="absolute -inset-4 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 glass shadow-2xl">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 space-y-6">
               <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                 <step.icon size={28} />
               </div>
               
               <div className="space-y-4">
                 <h3 className="text-3xl font-bold text-white tracking-tight leading-none">
                    <span className="text-blue-500 mr-3">0{index + 1}.</span>
                    {step.title}
                 </h3>
                 <p className="text-gray-400 text-lg leading-relaxed">
                    {step.description}
                 </p>
               </div>

               <a 
                 href={step.link} 
                 className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 tracking-widest uppercase group/link transition-all"
               >
                 Activate Phase <ExternalLink className="size-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
               </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
