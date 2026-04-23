import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";
import FullScreenLoader from "../../../components/ui/full-screen-loader";
import {
  Code2,
  Users,
  Map,
  ChevronRight,
  Target,
  TerminalSquare,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Zap,
  ChevronDown,
  Hexagon,
  Cpu,
  CheckCircle2,
  FileDown,
  Clock,
  ExternalLink,
  LayoutDashboard,
  AlertCircle,
  Dna,
  FileText,
  Plus
} from "lucide-react";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";
import { LiquidMetalBorder } from "../../../components/ui/LiquidMetalBorder";
import { Card, CardContent } from "../../../components/ui/card";
import SoftAurora from "../../../components/ui/SoftAurora";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";

// --- Simple UI Components ---

const StatusBadge = ({ children, color = "zinc" }) => {
  const colors = {
    zinc: "bg-zinc-900 border-zinc-800 text-zinc-500",
    green: "bg-green-950/20 border-green-500/20 text-green-400",
    red: "bg-red-950/20 border-red-500/20 text-red-400",
    blue: "bg-blue-950/20 border-blue-500/20 text-blue-400"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded border text-[9px] font-mono font-bold uppercase tracking-widest", colors[color])}>
      {children}
    </span>
  );
};

const MatchGauge = ({ value, size = 160 }) => {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 z-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute top-1/2 left-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full origin-bottom",
              i % 5 === 0 ? "h-2.5 bg-zinc-700" : "h-1.5 bg-zinc-800/40"
            )}
            style={{ transform: `rotate(${i * 6}deg) translateY(-${size / 2 - 6}px)` }}
          />
        ))}
      </div>
      <svg className="rotate-[-90deg] z-10" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-900/40" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-100"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <span className="font-display text-5xl font-bold text-white tracking-tighter">
            {value}<span className="text-zinc-500 text-2xl">%</span>
          </span>
          <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-[0.4em] mt-1">Readiness</span>
        </motion.div>
      </div>
    </div>
  );
};

const IntelligenceCard = ({ item, index, prefix = "T" }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "border transition-all duration-300 relative group overflow-hidden rounded-2xl mb-4",
        isOpen ? "border-zinc-700/50 bg-zinc-900/30 shadow-2xl" : "border-zinc-800/50 bg-zinc-950/10 hover:border-zinc-700/30"
      )}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 flex items-start gap-6 cursor-pointer outline-none">
        <div className={cn(
          "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold tracking-widest transition-all duration-500 border",
          isOpen ? "bg-zinc-100 border-zinc-100 text-zinc-950 scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-zinc-900 border-zinc-800 text-zinc-600"
        )}>
          {prefix}{String(index + 1).padStart(2, '0')}
        </div>
        <div className="flex-1">
          <h4 className={cn("font-display text-lg font-bold tracking-tight leading-snug transition-colors", isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>
            {item.question}
          </h4>
        </div>
        <div className="pt-2">
           <ChevronDown className={cn("size-5 text-zinc-600 transition-all duration-500", isOpen ? "rotate-180 text-zinc-100" : "group-hover:text-zinc-400")} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="px-10 pb-8 pt-2 space-y-6">
              <div className="h-px bg-zinc-800/50" />
              <div className="space-y-3">
                <p className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Target size={12} /> Why they ask this
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed font-light italic">"{item.intention}"</p>
              </div>
              <div className="p-6 bg-zinc-100/[0.02] border border-zinc-800/30 rounded-xl">
                <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Cpu size={12} /> Suggested Answer
                </p>
                <p className="text-zinc-200 text-sm leading-relaxed font-light">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Dashboard = () => {
  const { interviewId } = useParams();
  const { report, loading, error, getResumePdf } = useInterview();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("technical");

  if (loading) return <FullScreenLoader message="Loading interview report..." />;
  if (error || !report) return <ErrorState error={error} />;

  const SECTORS = [
    { id: "technical", label: "Technical Prep", icon: Code2, desc: "Coding and system architecture help", prefix: "T" },
    { id: "behavioral", label: "Soft Skills", icon: Users, desc: "Behavioral question preparation", prefix: "B" },
    { id: "roadmap", label: "Study Plan", icon: Map, desc: "Your daily preparation roadmap", prefix: "S" },
  ];

  const activeSector = SECTORS.find(s => s.id === activeTab);

  return (
    <div className="h-screen w-full bg-[#09090b] text-zinc-400 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      
      {/* --- BACKGROUND IMMERSION --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <SoftAurora speed={0.2} color1="#18181b" color2="#000000" />
      </div>
      <div className="absolute inset-[-200%] pointer-events-none z-[100] opacity-[0.015] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* --- COMMAND HEADER --- */}
      <header className="shrink-0 h-16 border-b border-zinc-800/50 bg-zinc-950/40 backdrop-blur-xl flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group transition-all">
            <div className="scale-75 group-hover:scale-80 transition-transform">
              <Logo />
            </div>
          </Link>
          <div className="h-4 w-px bg-zinc-800/60" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em] leading-none mb-1.5">
               <span>Root</span>
               <span className="text-zinc-800">//</span>
               <span>Reports</span>
               <span className="text-zinc-800">//</span>
               <span className="text-zinc-500">Live_Stream</span>
            </div>
            <h2 className="text-sm font-bold text-zinc-100 tracking-tight leading-none uppercase truncate max-w-[300px]">{report.title}</h2>
          </div>
          <div className="h-4 w-px bg-zinc-800/60" />
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-widest uppercase">Live</span>
             </div>
             <StatusBadge color="blue">Report Mode</StatusBadge>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <button
             onClick={async () => {
               try {
                 await getResumePdf(interviewId);
                 showToast({ message: "PDF Downloaded", type: "success" });
               } catch (err) {
                 showToast({ message: "Download failed", type: "error" });
               }
             }}
             className="flex items-center gap-2.5 px-4 py-2 rounded-md bg-zinc-100 text-zinc-950 font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all cursor-pointer active:scale-95 shadow-xl shadow-white/5"
           >
             <FileDown size={14} /> Download PDF
           </button>
        </div>
      </header>

      {/* --- CORE TACTICAL GRID --- */}
      <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        
        {/* --- LEFT NAVIGATION (col-span-2) --- */}
        <aside className="col-span-2 border-r border-zinc-800/50 bg-zinc-950/20 flex flex-col p-8 gap-12 min-h-0">
          <div className="space-y-2">
            <p className="text-[9px] font-mono font-bold text-zinc-700 px-2 mb-6 uppercase tracking-[0.4em]">Categories</p>
            {SECTORS.map((sector, index) => (
              <button
                key={sector.id}
                onClick={() => setActiveTab(sector.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-500 group relative outline-none cursor-pointer",
                  activeTab === sector.id 
                    ? "bg-white/[0.04] border-zinc-700/50 text-zinc-100 shadow-[0_0_25px_rgba(255,255,255,0.03)]" 
                    : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.02]"
                )}
              >
                <div className={cn(
                  "shrink-0 size-8 rounded-lg flex items-center justify-center transition-all duration-500",
                  activeTab === sector.id ? "text-zinc-100 scale-110" : "text-zinc-700 group-hover:text-zinc-500"
                )}>
                  <sector.icon size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-mono font-bold opacity-40 uppercase tracking-widest leading-none mb-1">Part 0{index + 1}</span>
                  <span className="text-xs font-bold tracking-tight">{sector.label}</span>
                </div>
                {activeTab === sector.id && (
                  <motion.div 
                    layoutId="sector-pill" 
                    className="absolute right-4 size-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                  />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* --- CENTER STREAM (col-span-7) --- */}
        <section className="col-span-7 flex flex-col min-h-0 bg-zinc-950/10">
          <div className="shrink-0 px-12 pt-12 pb-8 border-b border-zinc-900/50 flex items-end justify-between relative">
             <div className="space-y-1">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-[1px] bg-zinc-800" />
                   <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Report Detail</span>
                </div>
                <h1 className="font-display text-4xl font-bold text-white tracking-tighter leading-none">
                  {activeSector.label}
                </h1>
                <p className="text-zinc-500 text-sm font-light max-w-xl mt-3">{activeSector.desc} based on your resume and job description.</p>
             </div>
             <div className="flex gap-2">
                <StatusBadge color="blue">Secure Mode</StatusBadge>
                <StatusBadge color="zinc">Analysis OK</StatusBadge>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto px-12 pt-10 pb-24 scrollbar-hidden" data-lenis-prevent>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto"
              >
                {activeTab === "technical" && (
                  report.technicalQuestions?.length > 0 ? (
                    report.technicalQuestions.map((q, i) => (
                      <IntelligenceCard key={i} item={q} index={i} prefix="T" />
                    ))
                  ) : <EmptyState icon={Code2} text="No technical questions found." />
                )}

                {activeTab === "behavioral" && (
                  report.behavioralQuestions?.length > 0 ? (
                    report.behavioralQuestions.map((q, i) => (
                      <IntelligenceCard key={i} item={q} index={i} prefix="B" />
                    ))
                  ) : <EmptyState icon={Users} text="No behavioral questions found." />
                )}

                {activeTab === "roadmap" && (
                  <div className="space-y-10 relative pl-8 py-4">
                     <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800/40" />
                     {report.preparationPlan?.map((plan, i) => (
                       <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pb-10 group/plan">
                         <div className="absolute -left-10 top-1 size-4 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center z-10 transition-colors group-hover/plan:border-white">
                            <div className="size-1 rounded-full bg-white shadow-[0_0_10px_white]" />
                         </div>
                         <div className="space-y-6">
                            <div>
                               <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Day {plan.day} Focus</span>
                               <h3 className="font-display text-2xl font-bold text-white mt-1 tracking-tight">{plan.focus}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {plan.tasks?.map((task, j) => (
                                 <div key={j} className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl flex gap-4 items-start group/task hover:border-zinc-700 transition-all hover:bg-zinc-900/50">
                                    <CheckCircle2 size={16} className="text-zinc-700 mt-0.5 group-hover/task:text-zinc-400 transition-colors" />
                                    <p className="text-zinc-400 text-xs leading-relaxed font-light">{task}</p>
                                 </div>
                               ))}
                            </div>
                         </div>
                       </motion.div>
                     ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* --- RIGHT DIAGNOSTICS (col-span-3) --- */}
        <aside className="col-span-3 border-l border-zinc-800/50 bg-zinc-950/20 flex flex-col min-h-0">
          <div className="p-8 border-b border-zinc-800/50 flex flex-col items-center shrink-0">
            <div className="w-full flex items-center justify-between mb-8">
               <p className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.4em]">Match Score</p>
               <Activity size={14} className="text-zinc-700" />
            </div>
            <MatchGauge value={report.matchScore} size={140} />
          </div>

          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="px-10 py-8 flex items-center justify-between shrink-0 border-b border-zinc-900/30">
               <p className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.4em]">Skill Gaps</p>
               <ShieldAlert size={14} className="text-zinc-900" />
            </div>
            <div className="flex-1 overflow-y-auto px-10 pt-8 pb-10 space-y-6 scrollbar-hidden" data-lenis-prevent>
              {report.skillGaps?.map((gap, i) => (
                <div key={i} className="space-y-2.5 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors tracking-tight leading-none">{gap.skill}</span>
                    <StatusBadge color={gap.severity === "high" ? "red" : gap.severity === "medium" ? "blue" : "zinc"}>
                      {gap.severity}
                    </StatusBadge>
                  </div>
                  <div className="h-0.5 w-full bg-zinc-900 relative overflow-hidden rounded-full border border-zinc-800/50">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: gap.severity === "high" ? "100%" : gap.severity === "medium" ? "65%" : "30%" }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className={cn(
                          "h-full rounded-full",
                          gap.severity === "high" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" : gap.severity === "medium" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" : "bg-zinc-600"
                        )}
                     />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 p-8 border-t border-zinc-800/50 bg-zinc-950/20 flex justify-center">
             <Link to="/generate-report">
               <LiquidCtaButton>
                 New Report
               </LiquidCtaButton>
             </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

const EmptyState = ({ icon: Icon, text }) => (
  <div className="py-40 flex flex-col items-center justify-center text-center opacity-20">
     <AlertCircle size={48} className="mb-6 text-zinc-600" />
     <p className="text-[10px] font-mono font-bold uppercase tracking-[0.5em]">{text}</p>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#09090b] p-6 text-center overflow-hidden">
    <ShieldAlert size={64} className="text-red-500/50 mb-10" />
    <h1 className="font-display text-5xl font-bold text-white mb-6 tracking-tighter uppercase">Error</h1>
    <p className="text-zinc-500 text-lg max-w-sm mb-12 font-light leading-relaxed mx-auto">{error || "Could not retrieve report data."}</p>
    <Link to="/generate-report">
       <button className="px-10 py-3.5 bg-zinc-100 text-zinc-950 font-black text-[10px] uppercase tracking-[0.4em] rounded-md hover:bg-white transition-all active:scale-95 shadow-2xl shadow-white/5 cursor-pointer">Go Back</button>
    </Link>
  </div>
);

export default Dashboard;
