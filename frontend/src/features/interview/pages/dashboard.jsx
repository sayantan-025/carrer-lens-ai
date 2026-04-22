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
  ChevronDown
} from "lucide-react";

// --- Sub-Components ---

const Badge = ({ children, variant = "blue" }) => {
  const variants = {
    blue: "bg-blue-600/10 border-blue-500/20 text-blue-400",
    red: "bg-red-600/10 border-red-500/20 text-red-400",
    indigo: "bg-indigo-600/10 border-indigo-500/20 text-indigo-400",
    gray: "bg-white/5 border-white/10 text-gray-400"
  };
  return (
    <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const TechnicalFeed = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  if (!data?.length) return <EmptyFeed icon={TerminalSquare} text="No technical questions found." />;
  
  return (
    <div className="space-y-3">
      {data.map((q, i) => (
        <div
          key={i}
          className={`rounded-xl border transition-all duration-200 ${
            expandedIndex === i 
              ? "bg-white/5 border-white/10" 
              : "bg-transparent border-white/5 hover:border-white/10"
          }`}
        >
          <button 
            onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
            className="w-full text-left p-5 flex items-start gap-4"
          >
            <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
              expandedIndex === i ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-500"
            }`}>
              {i + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-base font-semibold text-white leading-snug">
                {q.question}
              </h4>
            </div>
            <ChevronDown className={`size-5 text-gray-500 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0 space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                    <p className="text-xs font-semibold text-gray-400 mb-1.5">Goal of this question</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{q.intention}</p>
                  </div>
                  <div className="p-4 bg-blue-600/5 rounded-lg border border-blue-500/10">
                    <p className="text-xs font-semibold text-blue-400 mb-1.5">Recommended Answer</p>
                    <p className="text-white/90 text-sm leading-relaxed">{q.answer}</p>
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
    <div className="space-y-3">
      {data.map((q, i) => (
        <div
          key={i}
          className={`rounded-xl border transition-all duration-200 ${
            expandedIndex === i 
              ? "bg-white/5 border-white/10" 
              : "bg-transparent border-white/5 hover:border-white/10"
          }`}
        >
          <button 
            onClick={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
            className="w-full text-left p-5 flex items-start gap-4"
          >
            <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
              expandedIndex === i ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-500"
            }`}>
              {i + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-base font-semibold text-white leading-snug">
                {q.question}
              </h4>
            </div>
            <ChevronDown className={`size-5 text-gray-500 transition-transform ${expandedIndex === i ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {expandedIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0 space-y-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                    <p className="text-xs font-semibold text-gray-400 mb-1.5">What they are looking for</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{q.intention}</p>
                  </div>
                  <div className="p-4 bg-indigo-600/5 rounded-lg border border-indigo-500/10">
                    <p className="text-xs font-semibold text-indigo-400 mb-1.5">Strategy (STAR Method)</p>
                    <p className="text-white/90 text-sm leading-relaxed">{q.answer}</p>
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
    <div className="relative pl-4 space-y-6">
      <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-white/10" />
      {data.map((plan, i) => (
        <div key={i} className="relative pl-8">
          <div className="absolute left-[-2px] top-6 w-2 h-2 rounded-full bg-blue-500 border border-[#020B18]" />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
            <span className="text-xs font-bold text-blue-400">Day {plan.day}</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-4">
              {plan.focus}
            </h3>
            <ul className="space-y-2.5">
              {plan.tasks?.map((task, j) => (
                <li key={j} className="flex gap-3 items-start text-gray-400 text-sm leading-relaxed">
                  <div className="shrink-0 size-1 rounded-full bg-blue-500/60 mt-2" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyFeed = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center justify-center py-20 opacity-30">
    <Icon size={32} className="mb-3 text-gray-400" />
    <p className="text-sm font-medium text-gray-500">{text}</p>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
    <div className="size-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
      <ShieldAlert size={28} className="text-red-500" />
    </div>
    <h1 className="text-2xl font-bold text-white mb-3">Unable to load report</h1>
    <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
      {error || "There was an issue fetching your interview analysis."}
    </p>
    <Link to="/dashboard" className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm transition-all hover:opacity-90">
      Back to Dashboard
    </Link>
  </div>
);

const Dashboard = () => {
  const { interviewId } = useParams();
  const { report, loading, error, getResumePdf } = useInterview();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("technical");

  if (loading) {
    return <FullScreenLoader message="Loading your report..." />;
  }

  if (error || !report) {
    return <ErrorState error={error} />;
  }

  const TABS = [
    { id: "technical", label: "Technical", icon: Code2, desc: "Engineering" },
    { id: "behavioral", label: "Behavioral", icon: Users, desc: "Alignment" },
    { id: "roadmap", label: "Roadmap", icon: Map, desc: "Strategy" },
  ];

  const activeTabData = TABS.find((t) => t.id === activeTab);

  return (
    <div className="h-[calc(100vh-120px)] w-full text-gray-200 font-sans selection:bg-blue-600/30 px-4 md:px-8 pb-4">
      {/* Dashboard Container */}
      <div className="h-full glass border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="shrink-0 px-8 py-5 border-b border-white/5 bg-black/10 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white leading-none">
                  {report.title}
                </h1>
              </div>
           </div>

           <button
             onClick={async () => {
               try {
                 await getResumePdf(interviewId);
                 showToast({ message: "PDF report exported", type: "success" });
               } catch (err) {
                 showToast({ message: "Failed to export PDF", type: "error" });
               }
             }}
             className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
           >
             <Download size={14} />
             Download Resume
           </button>
        </div>

        {/* Grid Layout */}
        <div className="flex-1 min-h-0 grid grid-cols-12 bg-white/5">
          
          {/* Sidebar Nav */}
          <aside className="col-span-2 bg-[#020B18]/40 p-5 flex flex-col gap-6 border-r border-white/5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-500 px-3 mb-3 uppercase tracking-wider">Sections</p>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                    activeTab === tab.id 
                      ? "bg-blue-600 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-300">System Ready</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section 
            className="col-span-7 bg-[#020B18]/10 overflow-y-auto p-8 lg:p-10"
            data-lenis-prevent
          >
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeTabData.label} Analysis
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Detailed review of your {activeTabData.desc.toLowerCase()} readiness for this role.
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
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
            className="col-span-3 bg-[#020B18]/40 flex flex-col min-h-0 border-l border-white/5 overflow-hidden"
          >
            {/* Small Gauge Section */}
            <div className="p-6 border-b border-white/5 flex flex-col items-center shrink-0">
              <p className="text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-wider self-start">Readiness</p>
              
              <div className="relative flex items-center justify-center mb-2">
                <div className="size-32 rounded-full border-8 border-white/5 flex flex-col items-center justify-center relative">
                  <motion.div 
                    initial={{ rotate: -225 }}
                    animate={{ rotate: (report.matchScore / 100) * 360 - 225 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-[-8px] rounded-full border-8 border-blue-500 border-t-transparent border-r-transparent"
                  />
                  <span className="text-4xl font-bold text-white leading-none">{report.matchScore}</span>
                  <span className="text-[10px] font-bold text-blue-400 mt-1">%</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-300">Match Score</p>
            </div>

            {/* Scrollable Skill Gaps */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="px-6 pt-6 pb-3 shrink-0">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Skill Gaps</p>
              </div>
              <div 
                className="flex-1 overflow-y-auto px-6 pb-6 space-y-2.5"
                data-lenis-prevent
              >
                {report.skillGaps?.map((gap, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-200">{gap.skill}</span>
                      <div className={`size-1.5 rounded-full ${
                        gap.severity === "high" ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : 
                        gap.severity === "medium" ? "bg-yellow-500 shadow-[0_0_8px_#f59e0b]" : 
                        "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                      }`} />
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        gap.severity === "high" ? "bg-red-500 w-full" : 
                        gap.severity === "medium" ? "bg-yellow-500 w-2/3" : 
                        "bg-blue-500 w-1/3"
                      }`} />
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
