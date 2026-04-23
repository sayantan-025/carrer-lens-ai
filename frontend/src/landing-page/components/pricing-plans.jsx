import React from "react"
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const plans = [
  {
    name: "Standard",
    description: "Essential tools for tactical preparation",
    price: "$0",
    period: "forever",
    features: [
      "3 AI Resume Scans / mo",
      "Basic Match Scoring",
      "Standard PDF Export",
      "Technical Skill Analysis",
      "Community Access"
    ],
    cta: "Start Free",
    highlighted: false,
    icon: Zap
  },
  {
    name: "Professional",
    description: "The complete protocol for high-stakes roles",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited Resume Scans",
      "Full Strategic Roadmaps",
      "Behavioral Script Generation",
      "Company Culture Matching",
      "Priority AI Generation",
      "Premium LaTeX Templates",
      "Direct Support"
    ],
    cta: "Deploy Now",
    highlighted: true,
    icon: Sparkles
  },
  {
    name: "Elite",
    description: "Industrial-grade training for leadership",
    price: "$79",
    period: "/month",
    features: [
      "Everything in Pro",
      "Unlimited Mock Interviews",
      "Executive Level Coaching",
      "Market Intelligence Reports",
      "Personal Branding Suite",
      "24/7 Strategic Support",
      "Lifetime Report Archive"
    ],
    cta: "Go Elite",
    highlighted: false,
    icon: ShieldCheck
  },
]

export default function PricingPlans() {
  return (
    <section id="pricing" className="px-6 py-24 md:py-40 bg-black relative overflow-hidden border-t border-zinc-900/50">
      {/* Premium Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Invest in Strategy</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Industrial-Grade <br className="hidden md:block" /> Investment.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Transparent pricing designed to scale with your career trajectory. Zero technical debt, total tactical superiority.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative p-10 rounded-[2.5rem] border flex flex-col h-full transition-all duration-500",
                plan.highlighted 
                  ? "bg-white border-white shadow-[0_0_80px_rgba(255,255,255,0.1)]" 
                  : "bg-zinc-900/20 border-zinc-800/50 hover:border-zinc-600/50 backdrop-blur-xl"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border border-white/20">
                  Recommended Protocol
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-10">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-500 group-hover:scale-110",
                  plan.highlighted ? "bg-zinc-100 border-zinc-200" : "bg-zinc-800/50 border-zinc-700/50"
                )}>
                  <plan.icon className={cn("w-6 h-6", plan.highlighted ? "text-zinc-900" : "text-zinc-400")} />
                </div>
                <h3 className={cn(
                  "font-display text-2xl font-bold mb-3 tracking-tight",
                  plan.highlighted ? "text-zinc-950" : "text-white"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                  "text-sm font-light leading-relaxed",
                  plan.highlighted ? "text-zinc-600" : "text-zinc-400"
                )}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className={cn(
                    "font-display text-5xl font-bold tracking-tighter",
                    plan.highlighted ? "text-zinc-950" : "text-white"
                  )}>
                    {plan.price}
                  </span>
                  <span className={cn(
                    "text-sm font-medium",
                    plan.highlighted ? "text-zinc-500" : "text-zinc-500"
                  )}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <Check className={cn(
                      "w-4 h-4 shrink-0 mt-0.5 transition-colors",
                      plan.highlighted ? "text-zinc-900" : "text-zinc-500 group-hover:text-white"
                    )} />
                    <span className={cn(
                      "text-sm font-light",
                      plan.highlighted ? "text-zinc-700" : "text-zinc-400 group-hover:text-zinc-300"
                    )}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-4 px-6 text-center rounded-2xl font-bold text-sm tracking-tight transition-all duration-300",
                    plan.highlighted
                      ? "bg-zinc-950 text-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                      : "bg-white text-zinc-950 hover:bg-zinc-200"
                  )}
                >
                  {plan.cta}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em] mt-20">
          Secure Deployment. Encrypted Intelligence. No hidden protocols.
        </p>
      </div>
    </section>
  )
}
