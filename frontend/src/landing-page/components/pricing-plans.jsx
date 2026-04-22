import SectionTitle from "./section-title";
import { Check, Rocket, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";

export default function PricingPlans() {
  const ref = useRef([]);
  const data = [
    {
      icon: Rocket,
      title: "Free",
      description: "Perfect for exploring our platform",
      price: "$0",
      buttonText: "Get Started",
      features: [
        "2 AI Interview Reports",
        "Basic Resume Analysis",
        "ATS-Friendly Templates",
        "Mock Interview Questions",
        "Community Access",
      ],
    },
    {
      icon: Zap,
      title: "Pro",
      description: "For active job seekers",
      price: "$19",
      mostPopular: true,
      buttonText: "Go Pro",
      features: [
        "Unlimited Reports",
        "Advanced Resume Builder",
        "Deep Skill Gap Analysis",
        "Priority AI Processing",
        "Expert Question Bank",
        "Email Support",
      ],
    },
    {
      icon: Award,
      title: "Unlimited",
      description: "Everything you need to land the job",
      price: "$49",
      buttonText: "Go Unlimited",
      features: [
        "Lifetime Access",
        "Personalized Career Roadmap",
        "Advanced Analytics",
        "Custom Resume Export",
        "24/7 Priority Support",
        "Early Access to Features",
      ],
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Choose your path to success."
        description="Select the plan that fits your career goals. No hidden fees, just pure AI-driven insights."
      />

      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 px-6 max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className={`group w-full max-w-sm glass p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 relative ${item.mostPopular ? "border-blue-500/50 shadow-blue-500/10 shadow-2xl scale-105" : "border-white/5"}`}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.1}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
            ref={(el) => (ref.current[index] = el)}
          >
            {item.mostPopular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <item.icon className="size-6" />
              </div>
              <span className="font-semibold text-white">{item.title}</span>
            </div>
            
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{item.price}</span>
              {item.price !== "$0" && (
                <span className="text-gray-400 text-sm">{item.price === "$49" ? "/lifetime" : "/month"}</span>
              )}
            </div>
            
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              {item.description}
            </p>
            
            <Link
              to="/register"
              className={`mt-8 w-full btn flex items-center justify-center py-4 rounded-xl font-semibold transition-all duration-300 ${item.mostPopular ? "bg-blue-600 hover:bg-blue-700 text-white border-none" : "glass hover:bg-white/10"}`}
            >
              {item.buttonText}
            </Link>
            
            <div className="mt-8 space-y-4">
              {item.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-blue-500/20 rounded-full p-0.5">
                    <Check className="size-3.5 text-blue-400" strokeWidth={3} />
                  </div>
                  <p className="text-sm text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
