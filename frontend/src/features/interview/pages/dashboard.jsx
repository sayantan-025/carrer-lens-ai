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
  AlertTriangle,
  TerminalSquare,
  Activity,
  Download,
  ShieldAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  Hexagon,
  Cpu
} from "lucide-react";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";
import { LiquidMetalBorder } from "../../../components/ui/LiquidMetalBorder";
import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

// --- Sub-Components ---

const Badge = ({ children, variant = "blue" }) => {
  const variants = {
    blue: "bg-zinc-800/50 border-zinc-700/50 text-zinc-300",
    red: "bg-red-950/20 border-red-500/20 text-red-400",
    indigo: "bg-indigo-950/20 border-indigo-500/20 text-indigo-400",
    gray: "bg-zinc-900 border-zinc-800 text-zinc-500"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold uppercase tracking-wider", variants[variant])}>
      {children}
    </span>
  );
};

const TechnicalFeed = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  if (!data?.length) return <EmptyFeed icon={TerminalSquare} text="No technical questions found." />;
  
  return (
    <div className="space-y-4">
      {data.map((q, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl border transition-all duration-300 overflow-hidden",
            expandedIndex === i 
              ? "bg-zinc-900/40 border-zinc-700/50 shadow-2xl" 
              : "bg-transparent border-zinc-800/50 hover:border-zinc-700/30"
          )}
        >
          <button 
            onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
            className="w-full text-left p-6 flex items-start gap-5"
          >
            <div className={cn(
              "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold border transition-all",
              expandedIndex === i ? "bg-zinc-100 border-zinc-100 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-zinc-500"
            )}>
              Q{i + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="font-display text-lg font-bold text-zinc-100 leading-snug group-hover:text-white transition-colors">
                {q.question}
              </h4>
            </div>
            <ChevronDown className={cn("size-5 text-zinc-600 transition-transform duration-300", expandedIndex === i ? 'rotate-180 text-zinc-300' : '')} />
          </button>

          <AnimatePresence>
            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0 space-y-4">
                  <div className="p-5 bg-black/40 rounded-xl border border-zinc-800/50">
                    <p className="text-[10px] font-mono font-bold text-zinc-600 mb-2 uppercase tracking-widest flex items-center gap-2">
                       <Target size={12} /> Diagnostic Intent
                    </p>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light italic">"{q.intention}"</p>
                  </div>
                  <div className="p-5 bg-zinc-100/5 rounded-xl border border-zinc-700/30">
                    <p className="text-[10px] font-mono font-bold text-zinc-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                       <Cpu size={12} /> Strategic Response
                    </p>
                    <p className="text-zinc-200 text-sm leading-relaxed font-light">{q.answer}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const BehavioralFeed = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  if (!data?.length) return <EmptyFeed icon={Users} text="No behavioral questions found." />;
  
  return (
    <div className="space-y-4">
      {data.map((q, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl border transition-all duration-300 overflow-hidden",
            expandedIndex === i 
              ? "bg-zinc-900/40 border-zinc-700/50 shadow-2xl" 
              : "bg-transparent border-zinc-800/50 hover:border-zinc-700/30"
          )}
        >
          <button 
            onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
            className="w-full text-left p-6 flex items-start gap-5"
          >
            <div className={cn(
              "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold border transition-all",
              expandedIndex === i ? "bg-zinc-100 border-zinc-100 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-zinc-500"
            )}>
              B{i + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="font-display text-lg font-bold text-zinc-100 leading-snug">
                {q.question}
              </h4>
            </div>
            <ChevronDown className={cn("size-5 text-zinc-600 transition-transform duration-300", expandedIndex === i ? 'rotate-180 text-zinc-300' : '')} />
          </button>

          <AnimatePresence>
            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0 space-y-4">
                  <div className="p-5 bg-black/40 rounded-xl border border-zinc-800/50">
                    <p className="text-[10px] font-mono font-bold text-zinc-600 mb-2 uppercase tracking-widest">Alignment Objectives</p>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light italic">"{q.intention}"</p>
                  </div>
                  <div className="p-5 bg-zinc-100/5 rounded-xl border border-zinc-700/30">
                    <p className="text-[10px] font-mono font-bold text-zinc-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={12} /> STAR Execution Strategy
                    </p>
                    <p className="text-zinc-200 text-sm leading-relaxed font-light">{q.answer}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const RoadmapFeed = ({ data }) => {
  if (!data?.length) return <EmptyFeed icon={Map} text="No roadmap available." />;
  return (
    <div className="relative pl-6 space-y-8">
      <div className="absolute left-[7px] top-6 bottom-6 w-[1px] bg-zinc-800" />
      {data.map((plan, i) => (
        <div key={i} className="relative pl-10">
          <div className="absolute left-[-2px] top-6 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
          </div>
          <Card className="border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:border-zinc-500/30 transition-all duration-500">
            <CardContent className="p-6">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">Deployment: Day {plan.day}</span>
              <h3 className="font-display text-xl font-bold text-white mt-1 mb-6">
                {plan.focus}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.tasks?.map((task, j) => (
                  <li key={j} className="flex gap-3 items-start p-3 rounded-xl bg-black/20 border border-zinc-800/30 text-zinc-400 text-sm font-light leading-relaxed">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-zinc-600" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

const EmptyFeed = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-zinc-900 rounded-[32px]">
    <Icon size={40} className="mb-4 text-zinc-800" />
    <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">{text}</p>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
    <div className="size-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8">
      <ShieldAlert size={32} className="text-zinc-600" />
    </div>
    <h1 className="font-display text-3xl font-bold text-white mb-4 tracking-tight">System Access Restricted</h1>
    <p className="text-zinc-500 text-base max-w-sm mb-10 leading-relaxed font-light">
      {error || "Encountered a critical error while retrieving your strategic briefing data."}
    </p>
    <Link to="/generate-report">
       <LiquidCtaButton>Return to Command</LiquidCtaButton>
    </Link>
  </div>
);

const Dashboard = () => {
  const { interviewId } = useParams();
  const { report, loading, error, getResumePdf } = useInterview();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("technical");

  if (loading) {
    return <FullScreenLoader message="Initializing Strategic Briefing..." />;
  }

  if (error || !report) {
    return <ErrorState error={error} />;
  }

  const TABS = [
    { id: "technical", label: "Technical", icon: Code2, desc: "Engineering Architecture" },
    { id: "behavioral", label: "Behavioral", icon: Users, desc: "Alignment & Leadership" },
    { id: "roadmap", label: "Roadmap", icon: Map, desc: "Preparation Deployment" },
  ];

  const activeTabData = TABS.find((t) => t.id === activeTab);

  return (
    <div className="h-[calc(100vh-120px)] w-full text-zinc-400 font-sans selection:bg-zinc-100/10 px-4 md:px-8 pb-4">
      {/* Dashboard Container */}
      <div className="h-full glass border border-zinc-800/50 rounded-[32px] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="shrink-0 px-8 py-6 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="size-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
                 <Hexagon size={24} className="fill-zinc-800" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                   <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em]">Operational Briefing</span>
                   <Badge variant="blue">ID: {interviewId.slice(-6)}</Badge>
                </div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight leading-none">
                  {report.title}
                </h1>
              </div>
           </div>

           <LiquidCtaButton
             onClick={async () => {
               try {
                 await getResumePdf(interviewId);
                 showToast({ message: "Strategic asset exported", type: "success" });
               } catch (err) {
                 showToast({ message: "Transmission failure", type: "error" });
               }
             }}
           >
             Export PDF Report
           </LiquidCtaButton>
        </div>

        {/* Grid Layout */}
        <div className="flex-1 min-h-0 grid grid-cols-12">
          
          {/* Sidebar Nav */}
          <aside className="col-span-12 lg:col-span-2 bg-zinc-950/20 p-6 flex flex-col gap-8 border-r border-zinc-800/50">
            <div className="space-y-2">
              <p className="text-[10px] font-mono font-bold text-zinc-600 px-3 mb-4 uppercase tracking-[0.2em]">Analysis Sections</p>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                    activeTab === tab.id 
                      ? "bg-zinc-100 text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                  )}
                >
                  <tab.icon size={18} />
                  <span className="text-sm font-bold tracking-tight">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-zinc-900"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={14} className="text-zinc-400" />
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Protocol Active</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-zinc-400" 
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section 
            className="col-span-12 lg:col-span-7 bg-black/10 overflow-y-auto p-8 lg:p-12"
            data-lenis-prevent
          >
            <div className="max-w-3xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-[1px] bg-zinc-800" />
                   <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em]">Deep Dive Analysis</span>
                </div>
                <h2 className="font-display text-4xl font-bold text-white mb-4 tracking-tighter">
                  {activeTabData.label} <span className="text-zinc-500">Diagnostics</span>
                </h2>
                <p className="text-zinc-500 text-lg font-light leading-relaxed">
                  Industrial-grade review of your <span className="text-zinc-300 underline underline-offset-4 decoration-zinc-800">{activeTabData.desc.toLowerCase()}</span> readiness.
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "technical" && <TechnicalFeed data={report.technicalQuestions} />}
                  {activeTab === "behavioral" && <BehavioralFeed data={report.behavioralQuestions} />}
                  {activeTab === "roadmap" && <RoadmapFeed data={report.preparationPlan} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Right Sidebar - Diagnostics */}
          <aside 
            className="col-span-12 lg:col-span-3 bg-zinc-950/20 flex flex-col min-h-0 border-l border-zinc-800/50 overflow-hidden"
          >
            {/* Small Gauge Section */}
            <div className="p-8 border-b border-zinc-800/50 flex flex-col items-center shrink-0">
              <p className="text-[10px] font-mono font-bold text-zinc-600 mb-8 uppercase tracking-[0.2em] self-start">Operational Readiness</p>
              
              <LiquidMetalBorder 
                borderRadius={9999} 
                borderWidth={1} 
                opacity={0.5}
                speed={0.5}
                className="mb-6"
              >
                <div className="size-40 rounded-full bg-zinc-950 flex flex-col items-center justify-center relative border border-zinc-800/50 shadow-2xl">
                  <div className="absolute inset-4 rounded-full border border-zinc-900 border-dashed animate-[spin_20s_linear_infinite]" />
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-6xl font-bold text-white leading-none"
                  >
                    {report.matchScore}
                  </motion.span>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 mt-2 uppercase tracking-widest">Match Protocol</span>
                </div>
              </LiquidMetalBorder>
            </div>

            {/* Scrollable Skill Gaps */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="px-8 pt-8 pb-4 shrink-0 flex items-center justify-between">
                <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">Risk Analysis</p>
                <div className="flex gap-1">
                   <div className="w-1 h-1 rounded-full bg-zinc-800" />
                   <div className="w-1 h-1 rounded-full bg-zinc-800" />
                   <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>
              </div>
              <div 
                className="flex-1 overflow-y-auto px-8 pb-8 space-y-3"
                data-lenis-prevent
              >
                {report.skillGaps?.map((gap, i) => (
                  <div key={i} className="group p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{gap.skill}</span>
                      <div className={cn(
                        "text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border",
                        gap.severity === "high" ? "bg-red-950/20 border-red-500/30 text-red-400" : 
                        gap.severity === "medium" ? "bg-yellow-950/20 border-yellow-500/30 text-yellow-400" : 
                        "bg-blue-950/20 border-blue-500/30 text-blue-400"
                      )}>
                        {gap.severity.toUpperCase()}
                      </div>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ 
                          width: gap.severity === "high" ? "100%" : gap.severity === "medium" ? "66%" : "33%" 
                        }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          gap.severity === "high" ? "bg-red-500" : 
                          gap.severity === "medium" ? "bg-yellow-500" : 
                          "bg-zinc-400"
                        )} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
