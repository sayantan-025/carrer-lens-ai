import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useInterview } from "../hooks/useinterview";
import { useToast } from "../../../context/toast-context";
import FullScreenLoader from "../../../components/ui/full-screen-loader";
import {
  Code2,
  Users,
  Map,
  ChevronRight,
  TrendingUp,
  Target,
  AlertTriangle,
  TerminalSquare,
  Sparkles,
  Activity,
  Download,
} from "lucide-react";

const Dashboard = () => {
  const { interviewId } = useParams();
  const { report, loading, error, getResumePdf } = useInterview();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("technical");

  if (loading) {
    const message = (loading && report) 
      ? "Preparing your optimized resume..." 
      : "Accessing Secure Archives...";
    return <FullScreenLoader message={message} />;
  }

  if (error || !report) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030303] text-center px-6">
        <div className="w-20 h-20 rounded-[28px] bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Report Retrieval Failed</h1>
        <p className="text-zinc-500 max-w-md mb-10 font-light leading-relaxed">
          {error || "The requested interview protocol could not be located in our secure archives. It may have been deleted or is inaccessible."}
        </p>
        <Link 
          to="/generate-report"
          className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl border border-white/10 transition-all font-bold flex items-center gap-3"
        >
          <Map size={18} />
          Go to Synthesis
        </Link>
      </div>
    );
  }

  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      icon: Code2,
      desc: "Engineering",
    },
    {
      id: "behavioral",
      label: "Behavioral Matrix",
      icon: Users,
      desc: "Cultural Fit",
    },
    {
      id: "roadmap",
      label: "Execution Roadmap",
      icon: Map,
      desc: "Preparation Strategy",
    },
  ];

  return (
    <div className="w-full relative flex flex-col flex-1 h-full mb-20">
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 pb-20 pt-32 flex flex-col">
        {/* Responsively locked height on desktop to prevent overflow, auto height on mobile flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:h-[calc(100vh-11rem)] min-h-[600px]">
          {/* LEFT: Navigation Panel (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-start gap-4 w-full p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? "bg-[#111111] border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-neon shadow-[0_0_15px_rgba(140,255,46,0.5)]" />
                  )}

                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${
                      isActive
                        ? "bg-brand-neon/10 text-brand-neon border-brand-neon/30"
                        : "bg-white/5 text-white/50 border-white/10 group-hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex flex-col items-start text-left mt-2">
                    <span
                      className={`text-base font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}
                    >
                      {tab.label}
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-widest mt-1 font-mono">
                      {tab.desc}
                    </span>
                  </div>

                  {!isActive && (
                    <ChevronRight
                      size={16}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white/50 transition-colors"
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Generated Resume Download Button */}
            <motion.button
              whileHover={{
                y: -2,
                backgroundColor: "rgba(140, 255, 46, 0.15)",
                borderColor: "rgba(140, 255, 46, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  await getResumePdf(interviewId);
                  showToast({ 
                    message: "Resume downloaded successfully!", 
                    type: "success" 
                  });
                } catch (err) {
                  showToast({ 
                    message: "Failed to download resume. Please try again.", 
                    type: "error" 
                  });
                }
              }}
              className="mt-4 flex items-center justify-between gap-4 w-full p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden bg-brand-neon/[0.05] border-brand-neon/20 shadow-lg"
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-bold tracking-tight text-white group-hover:text-brand-neon transition-colors">
                  Download Resume
                </span>
                <span className="text-xs text-brand-neon/70 uppercase tracking-widest mt-1 font-mono">
                  PDF
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20 group-hover:bg-brand-neon group-hover:text-black transition-all">
                <Download size={18} />
              </div>
            </motion.button>
          </motion.div>

          {/* MIDDLE: Content Area (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-6 bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col h-[700px] lg:h-full"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20">
                  <TerminalSquare size={20} className="text-brand-neon" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-xs text-brand-neon/70 mt-1 uppercase tracking-widest font-mono">
                    Live Data Stream
                  </p>
                </div>
              </div>
              <span className="px-4 py-1.5 bg-brand-neon/10 text-brand-neon border border-brand-neon/20 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse"></span>
                Active
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto relative focus-within:bg-[#0D0D0D] transition-colors [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent pb-12">
              {/* Left Line Numbers */}
              <div className="absolute left-6 top-10 bottom-10 w-6 flex flex-col text-[#222] font-mono text-xs items-end pr-2 select-none pointer-events-none hidden md:flex">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="md:pl-10 flex flex-col gap-12"
                >
                  {activeTab === "technical" &&
                    (report.technicalQuestions?.length > 0 ? (
                      report.technicalQuestions.map((q, i) => (
                        <article key={i} className="flex flex-col gap-5">
                          <h3 className="text-xl font-bold text-white/90 leading-snug flex items-start gap-4">
                            <span className="text-brand-neon font-mono text-sm mt-1 opacity-70">
                              [{String(i + 1).padStart(2, "0")}]
                            </span>
                            {q.question}
                          </h3>
                          <div className="pl-[2.75rem] space-y-4">
                            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 bg-white/40 rounded-full"></span>{" "}
                                Evaluator Intent
                              </h4>
                              <p className="text-sm text-white/70 leading-relaxed font-light">
                                {q.intention}
                              </p>
                            </div>
                            <div className="bg-brand-neon/[0.03] p-6 rounded-2xl border border-brand-neon/10 hover:border-brand-neon/20 transition-colors relative overflow-hidden group/ans">
                              <div className="absolute left-0 top-0 w-1 flex h-full bg-brand-neon/80"></div>
                              <h4 className="text-[10px] text-brand-neon/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 bg-brand-neon rounded-full"></span>{" "}
                                Optimal Response
                              </h4>
                              <p className="text-sm text-white/90 leading-relaxed font-light">
                                {q.answer}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="text-white/30 text-sm tracking-widest italic py-10 font-mono">
                        _ NO TECHNICAL DATA FOUND
                      </div>
                    ))}

                  {activeTab === "behavioral" &&
                    (report.behavioralQuestions?.length > 0 ? (
                      report.behavioralQuestions.map((q, i) => (
                        <article key={i} className="flex flex-col gap-5">
                          <h3 className="text-xl font-bold text-white/90 leading-snug flex items-start gap-4">
                            <span className="text-brand-neon font-mono text-sm mt-1 opacity-70">
                              [{String(i + 1).padStart(2, "0")}]
                            </span>
                            {q.question}
                          </h3>
                          <div className="pl-[2.75rem] space-y-4">
                            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 bg-white/40 rounded-full"></span>{" "}
                                Psychological Focus
                              </h4>
                              <p className="text-sm text-white/70 leading-relaxed font-light">
                                {q.intention}
                              </p>
                            </div>
                            <div className="bg-brand-neon/[0.03] p-6 rounded-2xl border border-brand-neon/10 hover:border-brand-neon/20 transition-colors relative overflow-hidden group/ans">
                              <div className="absolute left-0 top-0 w-1 h-full flex bg-brand-neon/80"></div>
                              <h4 className="text-[10px] text-brand-neon/70 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 bg-brand-neon rounded-full"></span>{" "}
                                Framework Structure
                              </h4>
                              <p className="text-sm text-white/90 leading-relaxed font-light">
                                {q.answer}
                              </p>
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="text-white/30 text-sm tracking-widest italic py-10 font-mono">
                        _ NO BEHAVIORAL DATA FOUND
                      </div>
                    ))}

                  {activeTab === "roadmap" && (
                    <div className="relative border-l border-white/10 ml-2 md:ml-4 space-y-16 pb-8">
                      {report.preparationPlan?.length > 0 ? (
                        report.preparationPlan.map((plan, i) => (
                          <div key={i} className="relative pl-10">
                            <div className="absolute top-1.5 -left-[7px] w-3.5 h-3.5 rounded-full bg-[#0A0A0A] border-2 border-brand-neon z-10" />
                            <div className="inline-flex px-3 py-1 bg-brand-neon/10 border border-brand-neon/20 rounded-md text-brand-neon text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
                              Day {plan.day}
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">
                              {plan.focus}
                            </h3>
                            <ul className="flex flex-col gap-3">
                              {plan.tasks?.map((t, j) => (
                                <li
                                  key={j}
                                  className="text-white/80 text-sm flex gap-4 leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-sm"
                                >
                                  <ChevronRight
                                    className="text-brand-neon/50 shrink-0 mt-0.5"
                                    size={16}
                                  />
                                  <span className="font-light">{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <div className="text-white/30 text-sm tracking-widest italic py-10 pl-8 font-mono">
                          _ NO ROADMAP FOUND
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Metrics Panel (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col gap-6 lg:h-full"
          >
            {/* Match Score Card */}
            <motion.div
              whileHover={{
                y: -5,
                borderColor: "rgba(140, 255, 46, 0.3)",
                backgroundColor: "rgba(13, 13, 13, 0.9)",
              }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 relative overflow-hidden flex-shrink-0 group transition-all duration-300"
            >
              {/* Border Beam Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute -right-10 -top-10 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <Target size={180} className="text-brand-neon rotate-12" />
              </div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Activity size={16} className="text-white" />
                </div>
                <h3 className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                  Match Score
                </h3>
              </div>

              <div className="flex flex-col items-center justify-center relative z-10 pb-4">
                <div className="flex items-start">
                  <span className="text-[6rem] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-lg">
                    {report.matchScore || 0}
                  </span>
                  <span className="text-3xl font-mono text-brand-neon font-bold">
                    %
                  </span>
                </div>

                <div className="w-full mt-10 bg-white/[0.03] h-2 rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-brand-neon rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${report.matchScore || 0}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Identified Gaps Card flex-1 to fill remaining space logically */}
            <motion.div
              whileHover={{
                y: -5,
                borderColor: "rgba(140, 255, 46, 0.3)",
                backgroundColor: "rgba(13, 13, 13, 0.9)",
              }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex-1 relative overflow-hidden flex flex-col min-h-[300px] lg:min-h-0 group transition-all duration-300"
            >
              {/* Border Beam Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <TrendingUp size={180} className="text-red-500 -rotate-12" />
              </div>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <AlertTriangle size={16} className="text-white" />
                </div>
                <h3 className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                  Skill Gaps
                </h3>
              </div>

              <div className="flex flex-col gap-4 relative z-10 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {report.skillGaps?.length > 0 ? (
                  report.skillGaps.map((gap, i) => {
                    const isHigh = gap.severity?.toLowerCase() === "high";
                    const isMed = gap.severity?.toLowerCase() === "medium";

                    let bgClass =
                      "bg-white/[0.05] border-white/10 text-white/50";
                    if (isHigh)
                      bgClass = "bg-red-500/10 border-red-500/20 text-red-500";
                    if (isMed)
                      bgClass =
                        "bg-yellow-500/10 border-yellow-500/20 text-yellow-500";

                    return (
                      <div
                        key={i}
                        className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm text-white/90 font-medium truncate mr-3 group-hover:text-white">
                            {gap.skill}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-md text-[9px] uppercase tracking-wider font-bold border ${bgClass}`}
                          >
                            {gap.severity}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-3 py-12 mt-2">
                    <Sparkles size={24} className="text-white/20" />
                    <span className="text-sm text-white/50 font-mono tracking-widest">
                      NO GAPS FOUND
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
