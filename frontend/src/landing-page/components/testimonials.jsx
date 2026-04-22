import SectionTitle from "./section-title";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const ref = useRef([]);
  const data = [
    {
      review:
        "The AI resume analysis was a complete game-changer. It identified critical missing keywords that were preventing me from getting past ATS filters.",
      name: "Sarah Jenkins",
      about: "Software Engineer @ TechFlow",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    },
    {
      review:
        "I was struggling with behavioral interviews until I used Career Lens. The personalized questions and prep plan gave me the confidence I needed.",
      name: "Marcus Thompson",
      about: "Product Manager",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    },
    {
      review:
        "Finally, a resume builder that actually works for developers. The LaTeX-style output is professional and passed every ATS I applied to.",
      name: "David Chen",
      about: "Full Stack Developer",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    },
    {
      review:
        "The match scoring is incredibly accurate. It helped me focus my energy on the jobs where I actually had a high chance of landing an interview.",
      name: "Elena Rodriguez",
      about: "Data Scientist",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    },
    {
      review:
        "As a career coach, I recommend Career Lens to all my clients. It's the most comprehensive AI tool for interview preparation on the market.",
      name: "James Wilson",
      about: "Executive Career Coach",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    },
    {
      review:
        "I went from zero callbacks to three interviews in one week after using the AI-optimized resume. The results speak for themselves.",
      name: "Jessica Wu",
      about: "UX Designer",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    },
  ];
  return (
    <section className="mt-32 flex flex-col items-center">
      <SectionTitle
        title="Success stories from our global community."
        description="Join thousands of professionals who have accelerated their careers with AI-driven insights."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="w-full space-y-5 rounded-2xl glass p-8 hover:-translate-y-1 transition-all duration-300"
            initial={{ y: 150, opacity: 0 }}
            ref={(el) => (ref.current[index] = el)}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.1}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="flex items-center gap-4">
              <img
                className="size-12 rounded-full object-cover border-2 border-blue-500/20"
                src={item.image}
                alt={item.name}
              />
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.about}</p>
              </div>
            </div>
            <p className="text-gray-300 italic">“{item.review}”</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
