import SectionTitle from "./section-title";
import { FileSearch, MessageSquare, FileCheck, Target, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Features() {
  const refs = useRef([]);

  const featuresData = [
    {
      icon: FileSearch,
      title: "AI Resume Analysis",
      description: "Deep-dive analysis of your resume against any job description to identify missing keywords and skills.",
    },
    {
      icon: MessageSquare,
      title: "Interview Prep",
      description: "Get a customized list of technical and behavioral questions tailored specifically to your background and the role.",
    },
    {
      icon: FileCheck,
      title: "ATS-Friendly Resumes",
      description: "Generate professional, LaTeX-inspired HTML resumes that are guaranteed to pass Applicant Tracking Systems.",
    },
    {
      icon: Target,
      title: "Match Scoring",
      description: "See exactly how well you match a job with detailed percentage scores and constructive feedback.",
    },
    {
      icon: Award,
      title: "Preparation Plan",
      description: "Receive a step-by-step preparation roadmap to bridge your skill gaps before the big interview day.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description: "Your resumes and data are securely stored and never shared. You have full control over your career history.",
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Everything you need to land the job"
        description="Our AI-powered tools provide the insights and preparation you need to stand out from the competition."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-6 max-w-7xl mx-auto">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className="hover:-translate-y-1 p-8 rounded-2xl space-y-4 glass flex flex-col items-start transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <feature.icon className="size-8" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
