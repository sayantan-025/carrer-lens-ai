import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";
import { Skeleton } from "../../../components/ui/skeleton";
import { Spinner } from "../../../components/ui/spinner";
import {
  Code2,
  Users,
  Map,
  Target,
  ChevronDown,
  Cpu,
  CheckCircle2,
  FileDown,
  Clock,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Menu,
  LayoutGrid
} from "lucide-react";
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";
import SoftAurora from "../../../components/ui/soft-aurora";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";

// --- Simple UI Components ---

const DashboardSkeleton = () => (
  <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
    <header className="h-16 border-b border-white/5 bg-zinc-950/40 px-4 md:px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6">
        <Skeleton className="h-6 w-32 md:w-40" />
        <Skeleton className="hidden md:block h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-28 md:w-32 rounded-xl" />
    </header>
    <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      <aside className="hidden md:block md:col-span-2 border-r border-white/5 p-8 space-y-4">
        <Skeleton className="h-4 w-20 mb-8" />
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-2xl" />)}
      </aside>
      <section className="col-span-1 md:col-span-7 p-6 md:p-16 space-y-8 md:space-y-12 overflow-y-auto scrollbar-hidden">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 md:h-16 w-3/4" />
        </div>
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-[2.5rem]" />)}
      </section>
      <aside className="hidden lg:block lg:col-span-3 border-l border-white/5 p-8 space-y-12">
        <div className="flex flex-col items-center space-y-6">
          <Skeleton className="size-32 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-4 w-32" />
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full rounded-xl" />)}
        </div>
      </aside>
    </main>
  </div>
);

const StatusBadge = ({ children, color = "zinc" }) => {
  const colors = {
    zinc: "bg-zinc-900 border-zinc-800 text-zinc-500",
    green: "bg-green-950/20 border-green-500/20 text-green-400",
    red: "bg-red-950/20 border-red-500/20 text-red-400",
    blue: "bg-blue-950/20 border-blue-500/20 text-blue-400"
  };
  return (
    <span className={cn("px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest", colors[color])}>
      {children}
    </span>
  );
};

const MatchGauge = ({ value, size = 130 }) => {
  const radius = size / 2 - 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg] z-10" width={size} height={size}>
        <circle 
          cx={size / 2} cy={size / 2} r={radius} 
          stroke="currentColor" strokeWidth="3" fill="transparent" 
          className="text-white/[0.03]" 
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} 
          stroke="currentColor" strokeWidth="3" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.3))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <span className="font-display text-3xl font-bold text-white tracking-tighter">
            {value}<span className="text-zinc-500 text-lg">%</span>
          </span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.1em] mt-0.5 text-center leading-none">Match Score</span>
        </motion.div>
      </div>
    </div>
  );
};

const IntelligenceCard = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "border transition-all duration-500 relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-4 md:mb-6",
        isOpen ? "border-white/10 bg-white/[0.03] shadow-2xl" : "border-white/5 bg-zinc-950/10 hover:border-white/10"
      )}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 md:p-10 flex items-start gap-4 md:gap-8 cursor-pointer outline-none min-h-[44px]">
        <div className={cn(
          "shrink-0 size-10 md:size-12 rounded-xl md:rounded-2xl flex items-center justify-center font-bold transition-all duration-500 border text-sm md:text-base",
          isOpen ? "bg-white border-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-zinc-900 border-white/5 text-zinc-500"
        )}>
          {index + 1}
        </div>
        <div className="flex-1">
          <h4 className={cn("font-display text-xl md:text-2xl font-bold tracking-tight leading-snug transition-colors", isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>
            {item.question}
          </h4>
        </div>
        <div className="pt-2">
           <ChevronDown className={cn("size-5 md:size-6 text-zinc-700 transition-all duration-500", isOpen ? "rotate-180 text-white" : "group-hover:text-zinc-400")} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="px-6 md:px-12 pb-8 md:pb-12 pt-2 space-y-6 md:space-y-10">
              <div className="h-px bg-white/5" />
              <div className="space-y-3 md:space-y-4">
                <p className="text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Target size={14} className="text-white/40" /> Why this question?
                </p>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light italic">"{item.intention}"</p>
              </div>
              <div className="p-6 md:p-10 bg-zinc-900/30 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem]">
                <p className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-2">
                  <Cpu size={14} className="text-white/40" /> Suggested Answer
                </p>
                <p className="text-zinc-200 text-base md:text-lg leading-relaxed font-light">{item.answer}</p>
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
  const [activeTab, setActiveTab] = useState("technical");
  const [isDownloading, setIsDownloading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  if (loading) return <DashboardSkeleton />;
  if (error || !report) return <ErrorState error={error} />;

  const SECTORS = [
    { id: "technical", label: "Technical Prep", icon: Code2, desc: "Coding and system questions" },
    { id: "behavioral", label: "Behavioral Prep", icon: Users, desc: "Soft skills and situations" },
    { id: "roadmap", label: "Study Plan", icon: Map, desc: "Your step-by-step roadmap" },
  ];

  const activeSector = SECTORS.find(s => s.id === activeTab);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await getResumePdf(interviewId);
      showSuccessToast("Downloaded successfully.");
    } catch (err) {
      showErrorToast("Download failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-zinc-400 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      <div className="tactical-overlay" />
      
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
        <SoftAurora speed={0.4} color1="#18181b" color2="#000000" />
      </div>

      {/* Header */}
      <header className="shrink-0 h-16 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="h-6 w-6" />
            <span className="font-display text-base font-bold text-white tracking-tighter max-sm:hidden">CareerLens<span className="text-zinc-500">AI</span></span>
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <h2 className="text-xs font-bold text-zinc-100 tracking-tight uppercase truncate max-w-[120px] md:max-w-[300px]">{report.title}</h2>
        </div>
        <div className="flex items-center gap-4">
           <LiquidCtaButton
             onClick={handleDownload}
             loading={isDownloading}
             loadingText="Downloading..."
             icon={FileDown}
             className="min-h-[40px] px-4 py-2"
             theme="light"
           >
             Download Resume
           </LiquidCtaButton>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden flex overflow-x-auto scrollbar-hidden bg-zinc-950/40 border-b border-white/5 shrink-0">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveTab(sector.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-4 px-6 min-w-[120px] gap-2 transition-all relative min-h-[44px]",
              activeTab === sector.id ? "text-white" : "text-zinc-500"
            )}
          >
            <sector.icon size={16} className={cn(activeTab === sector.id ? "text-white" : "text-zinc-700")} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{sector.label}</span>
            {activeTab === sector.id && (
              <motion.div layoutId="mobileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        
        {/* Section 1: Left Navigation (Desktop Only) */}
        <aside className="hidden md:flex md:col-span-2 border-r border-white/5 bg-zinc-950/20 flex-col p-8 gap-12 min-h-0 overflow-y-auto scrollbar-hidden">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 px-2 uppercase tracking-[0.2em] mb-6">Sections</p>
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveTab(sector.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all duration-300 relative group outline-none cursor-pointer",
                  activeTab === sector.id 
                    ? "bg-white/[0.03] border-white/10 text-white" 
                    : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]"
                )}
              >
                <div className={cn(
                  "shrink-0 size-9 rounded-xl flex items-center justify-center border transition-all duration-500",
                  activeTab === sector.id ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-zinc-900 border-white/5 text-zinc-700"
                )}>
                  <sector.icon size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-tight text-left">{sector.label}</span>
                {activeTab === sector.id && (
                  <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Section 2: Center Content */}
        <section className="col-span-1 md:col-span-10 lg:col-span-7 flex flex-col min-h-0 bg-black/40 overflow-y-auto scrollbar-hidden">
          <div className="p-6 md:p-16 max-w-4xl mx-auto w-full">
            <div className="mb-8 md:mb-14">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center gap-3 mb-4 md:mb-6"
               >
                  <div className="h-px w-6 bg-white/20" />
                  <span className="text-[10px] md:text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{activeSector.desc}</span>
               </motion.div>
               <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
                 {activeSector.label}
               </h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === "technical" && (
                  report.technicalQuestions?.length > 0 ? (
                    report.technicalQuestions.map((q, i) => (
                      <IntelligenceCard key={i} item={q} index={i} />
                    ))
                  ) : <EmptyState text="No technical questions found." />
                )}

                {activeTab === "behavioral" && (
                  report.behavioralQuestions?.length > 0 ? (
                    report.behavioralQuestions.map((q, i) => (
                      <IntelligenceCard key={i} item={q} index={i} />
                    ))
                  ) : <EmptyState text="No behavioral questions found." />
                )}

                {activeTab === "roadmap" && (
                  <div className="space-y-8 md:space-y-12 relative pl-6 md:pl-10 py-4">
                     <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />
                     {report.preparationPlan?.map((plan, i) => (
                       <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pb-8 md:pb-12">
                         <div className="absolute -left-[27px] md:-left-[45px] top-2 size-2 rounded-full bg-white shadow-[0_0_15px_white] z-10" />
                         <div className="space-y-6 md:space-y-8">
                            <div>
                               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Day {plan.day} Focus</span>
                               <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight">{plan.focus}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                               {plan.tasks?.map((task, j) => (
                                 <div key={j} className="p-5 md:p-6 bg-zinc-900/30 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] flex gap-3 md:gap-4 items-start hover:border-white/10 transition-all">
                                    <CheckCircle2 size={16} className="text-zinc-600 mt-1 shrink-0" />
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">{task}</p>
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

            {/* Mobile Diagnostic View */}
            <div className="lg:hidden mt-16 space-y-12 pb-12">
              <div className="h-px bg-white/5" />
              <div className="flex flex-col items-center">
                <p className="w-full text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 text-center">Match Score</p>
                <MatchGauge value={report.matchScore} size={150} />
              </div>
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldAlert size={12} className="text-zinc-700" /> Skill Gaps
                </p>
                <div className="space-y-6">
                  {report.skillGaps?.map((gap, i) => (
                    <div key={i} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-zinc-400 tracking-tight leading-none">{gap.skill}</span>
                        <StatusBadge color={gap.severity === "high" ? "red" : gap.severity === "medium" ? "blue" : "zinc"}>
                          {gap.severity}
                        </StatusBadge>
                      </div>
                      <div className="h-0.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                          <div 
                             style={{ width: gap.severity === "high" ? "100%" : gap.severity === "medium" ? "65%" : "30%" }}
                             className={cn(
                               "h-full rounded-full transition-all duration-1000",
                               gap.severity === "high" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : gap.severity === "medium" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-zinc-600"
                             )}
                          />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center w-full">
                <Link to="/generate-report" className="w-full">
                  <LiquidCtaButton className="w-full" fullWidth>Generate Analysis</LiquidCtaButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Right Diagnostics (Desktop Only) */}
        <aside className="hidden lg:flex lg:col-span-3 border-l border-white/5 bg-zinc-950/20 flex-col min-h-0 overflow-y-auto scrollbar-hidden">
          
          <div className="p-8 flex flex-col items-center shrink-0">
             <p className="w-full text-[9px] font-bold text-zinc-500 px-2 uppercase tracking-[0.2em] mb-6">Match Score</p>
             <MatchGauge value={report.matchScore} size={130} />
          </div>

          <div className="px-8">
            <div className="h-px bg-white/5" />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
             <div className="px-10 pt-8 pb-4 shrink-0">
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                 <ShieldAlert size={12} className="text-zinc-700" /> Skill Gaps
               </p>
             </div>
             <div className="px-8 mb-4">
                <div className="h-px bg-white/5" />
             </div>
             <div className="flex-1 overflow-y-auto px-10 pb-8 space-y-6 scrollbar-hidden">
               {report.skillGaps?.map((gap, i) => (
                 <div key={i} className="space-y-2.5 group">
                   <div className="flex items-center justify-between">
                     <span className="text-[11px] font-bold text-zinc-400 tracking-tight group-hover:text-zinc-200 transition-colors leading-none">{gap.skill}</span>
                     <StatusBadge color={gap.severity === "high" ? "red" : gap.severity === "medium" ? "blue" : "zinc"}>
                       {gap.severity}
                     </StatusBadge>
                   </div>
                   <div className="h-0.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: gap.severity === "high" ? "100%" : gap.severity === "medium" ? "65%" : "30%" }}
                         transition={{ duration: 1.5 }}
                         className={cn(
                           "h-full rounded-full",
                           gap.severity === "high" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : gap.severity === "medium" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-zinc-600"
                         )}
                      />
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="px-8">
            <div className="h-px bg-white/5" />
          </div>

          <div className="p-8 shrink-0 flex justify-center">
             <Link to="/generate-report" className="block w-full">
               <LiquidCtaButton className="w-full" fullWidth>Generate Analysis</LiquidCtaButton>
             </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

const EmptyState = ({ text }) => (
  <div className="py-40 flex flex-col items-center justify-center text-center opacity-20 px-6">
     <AlertCircle size={64} className="mb-8 text-zinc-800" />
     <p className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-600">{text}</p>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-black p-6 text-center">
    <ShieldAlert size={64} className="text-zinc-800 mb-10" />
    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter uppercase">Error</h1>
    <p className="text-zinc-500 text-base md:text-lg max-w-sm mb-12 font-light leading-relaxed mx-auto">{error || "Could not retrieve report data."}</p>
    <Link to="/generate-report" className="w-full max-w-[200px]">
       <LiquidCtaButton fullWidth>Go Back</LiquidCtaButton>
    </Link>
  </div>
);

export default Dashboard;
