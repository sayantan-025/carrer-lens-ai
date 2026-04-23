import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Target, 
  Upload, 
  CheckCircle2, 
  ArrowLeft,
  FileCheck,
  Zap,
  AlertCircle,
  PenLine,
  History,
  Calendar,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Command,
  FileDown,
  Hexagon,
  Clock,
  Activity,
  Plus,
  Info
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";
import { LiquidMetalBorder } from "../../../components/ui/LiquidMetalBorder";
import { Card, CardContent } from "../../../components/ui/card";
import SoftAurora from "../../../components/ui/SoftAurora";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";

// --- Sub-Components ---

const SynthesisEngine = ({ loading }) => {
  const [stage, setStage] = useState(0);
  const [metrics, setMetrics] = useState({ bitrate: 0, memory: 0 });
  
  const stages = [
    "Starting analysis...",
    "Scanning your resume...",
    "Reading job details...",
    "Finding matches...",
    "Creating your report..."
  ];

  useEffect(() => {
    let stageInterval;
    let metricsInterval;

    if (loading) {
      setStage(0);
      stageInterval = setInterval(() => {
        setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
      }, 2000);

      metricsInterval = setInterval(() => {
        setMetrics({
          bitrate: Math.floor(Math.random() * (800 - 400 + 1)) + 400,
          memory: (Math.random() * (1.8 - 0.8) + 0.8).toFixed(1)
        });
      }, 150);
    }

    return () => {
      clearInterval(stageInterval);
      clearInterval(metricsInterval);
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
        >
          <div className="flex flex-col items-center gap-8 relative overflow-hidden rounded-[40px] p-16 border border-zinc-800 bg-zinc-950/50 w-full max-w-lg shadow-2xl">
            {/* Hardware Noise Overlay */}
            <div className="absolute inset-[-200%] pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="relative size-24 z-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-zinc-800" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-3 rounded-full border-t border-zinc-100 border-r-transparent border-b-transparent border-l-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="size-6 bg-white rounded-full shadow-[0_0_30px_white]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 z-10 text-center">
              <AnimatePresence mode="wait">
                <motion.p key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-sm font-bold text-white uppercase tracking-[0.3em]">
                  {stages[stage]}
                </motion.p>
              </AnimatePresence>
              
              <div className="flex items-center gap-4 mt-2">
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Bit-rate</span>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">{metrics.bitrate} KBPS</span>
                 </div>
                 <div className="w-px h-6 bg-zinc-800" />
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Memory</span>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">{metrics.memory} GB</span>
                 </div>
              </div>

              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-6 opacity-40">System Analyzing Career Assets</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Page ---

const steps = [
  { id: "target", title: "Job Description", description: "What job are you aiming for?", icon: Target },
  { id: "resume", title: "Your Resume", description: "Upload your career history.", icon: FileText },
  { id: "context", title: "About You", description: "Any specific goals or gaps?", icon: PenLine }
];

const GenerateReport = () => {
  const navigate = useNavigate();
  const { generateReport, loading, reports, getReports } = useInterview();
  const { showToast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({ jobDescription: "", resumeFile: null, selfDescription: "" });
  
  const fileInputRef = useRef(null);

  useEffect(() => { getReports(); }, [getReports]);

  const isStep1Valid = useMemo(() => formData.jobDescription.trim().length >= 50, [formData.jobDescription]);
  const isFinalValid = useMemo(() => isStep1Valid && (formData.resumeFile !== null || formData.selfDescription.trim().length >= 20), [isStep1Valid, formData.resumeFile, formData.selfDescription]);

  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setFormData(prev => ({ ...prev, resumeFile: file }));
      showToast({ message: "Resume uploaded", type: "success" });
    } else {
      showToast({ message: "Upload a valid PDF", type: "error" });
    }
  };

  const handleGenerate = async () => {
    if (!isFinalValid) return;
    try {
      const result = await generateReport(formData);
      if (result) navigate(`/dashboard/${result._id}`);
    } catch (err) { showToast({ message: "Something went wrong", type: "error" }); }
  };

  return (
    <div className="h-screen w-full bg-black text-zinc-400 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <SoftAurora speed={0.2} color1="#18181b" color2="#000000" />
      </div>
      <div className="absolute inset-[-200%] pointer-events-none z-[100] opacity-[0.015] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Header Bar */}
      <header className="shrink-0 h-16 border-b border-zinc-800/50 bg-zinc-950/40 backdrop-blur-xl flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group transition-all">
            <div className="scale-75 group-hover:scale-80 transition-transform"><Logo /></div>
          </Link>
          <div className="h-4 w-px bg-zinc-800/60" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] leading-none">Initialization</span>
            <h2 className="text-sm font-bold text-zinc-100 tracking-tight leading-none mt-1.5 uppercase">New Report Protocol</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <StatusBadge color="blue">Focused Mode</StatusBadge>
        </div>
      </header>

      <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="col-span-3 border-r border-zinc-800/50 bg-zinc-950/20 flex flex-col p-8 gap-8 min-h-0 overflow-y-auto scrollbar-hidden">
           <div className="space-y-2">
              <p className="text-[9px] font-mono font-bold text-zinc-700 px-2 mb-6 uppercase tracking-[0.4em]">Step Navigation</p>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;
                return (
                  <div key={step.id} className={cn(
                    "w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-500",
                    isActive ? "bg-white/[0.04] border-zinc-700/50 text-white shadow-2xl" : "bg-transparent border-transparent text-zinc-600"
                  )}>
                    <div className={cn("size-8 rounded-lg flex items-center justify-center border transition-all", isActive ? "bg-white text-black border-white" : isCompleted ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-900 border-zinc-800")}>
                      {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-mono font-bold opacity-40 uppercase tracking-widest leading-none mb-1">Phase 0{index + 1}</span>
                       <span className="text-xs font-bold tracking-tight">{step.title}</span>
                    </div>
                  </div>
                );
              })}
           </div>

           {/* Rules Section */}
           <div className="mt-4 p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-[32px] space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                 <Info size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Rules</span>
              </div>
              <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                    <div className="size-1 rounded-full bg-zinc-600 mt-1.5" />
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Job Description must be at least <span className="text-zinc-300 font-bold">50 characters</span>.</p>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="size-1 rounded-full bg-zinc-600 mt-1.5" />
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Resumes must be in <span className="text-zinc-300 font-bold">PDF format</span> only.</p>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="size-1 rounded-full bg-zinc-600 mt-1.5" />
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Without a resume, the <span className="text-zinc-300 font-bold">Bio</span> needs 20+ chars.</p>
                 </li>
              </ul>
           </div>

           {/* Recent Reports - LARGER CARDS */}
           <div className="mt-auto pt-8 border-t border-zinc-800/50">
              <p className="text-[9px] font-mono font-bold text-zinc-700 px-2 mb-6 uppercase tracking-[0.4em]">Mission Archives</p>
              <div className="space-y-4">
                {reports?.slice(0, 2).map((r, i) => (
                  <Link key={i} to={`/dashboard/${r._id}`} className="group block p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[8px] font-mono font-bold text-zinc-600 group-hover:text-zinc-400">REPORT_{i+1}</span>
                       <ChevronRight size={12} className="text-zinc-800 group-hover:text-zinc-400" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase truncate mb-1">{r.title}</h4>
                    <span className="text-[10px] text-zinc-600 font-mono">{r.matchScore}% Match</span>
                  </Link>
                ))}
              </div>
           </div>
        </aside>

        {/* Input Core */}
        <section className="col-span-9 flex flex-col min-h-0 bg-[#070708]/50 p-16 overflow-y-auto scrollbar-hidden">
          <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
            <div className="mb-12">
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-zinc-800" />
                  <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Core Input</span>
               </div>
               <h1 className="font-display text-5xl font-bold text-white tracking-tighter leading-none mb-4">{steps[currentStep].title}</h1>
               <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-2xl">{steps[currentStep].description}</p>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="h-full">
                  {currentStep === 0 && (
                    <div className="relative group h-[450px]">
                      <textarea
                        id="job-description-input"
                        placeholder="Paste the full job requirements here..."
                        value={formData.jobDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                        className="w-full h-full bg-zinc-900/20 border border-zinc-800/80 rounded-[40px] p-10 text-zinc-100 placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-0 focus:border-zinc-500/50 transition-all resize-none font-light leading-relaxed text-xl"
                      />
                      <div className={cn(
                        "absolute bottom-8 right-10 text-[10px] font-mono font-bold tracking-[0.3em] uppercase",
                        isStep1Valid ? "text-green-500/50" : "text-zinc-700"
                      )}>
                        {formData.jobDescription.length} / 50 CHARS MIN
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "border-2 border-dashed rounded-[48px] h-[450px] flex flex-col items-center justify-center gap-8 transition-all cursor-pointer relative overflow-hidden group/upload",
                        (formData.resumeFile || isDragging) ? 'border-zinc-500 bg-zinc-500/5' : 'border-zinc-800/80 bg-zinc-900/10 hover:border-zinc-600 hover:bg-zinc-900/20'
                      )}
                    >
                      <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files[0])} accept=".pdf" className="hidden" />
                      <div className={cn("size-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-all duration-500", (isDragging || formData.resumeFile) && "scale-110 border-zinc-700")}>
                        {formData.resumeFile ? <FileCheck size={48} className="text-white" /> : <Upload size={48} className="text-zinc-700 group-hover/upload:text-zinc-400" />}
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-2xl">{formData.resumeFile ? formData.resumeFile.name : "Transmit Resume"}</p>
                        <p className="text-zinc-500 text-base font-light mt-3 uppercase tracking-widest">{formData.resumeFile ? "Ready for synthesis" : "Drop your PDF file here"}</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="h-[450px]">
                      <textarea
                        id="bio-input"
                        placeholder="Describe your background, goals, or concerns..."
                        value={formData.selfDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, selfDescription: e.target.value }))}
                        className="w-full h-full bg-zinc-900/20 border border-zinc-800/80 rounded-[40px] p-10 text-zinc-100 placeholder:text-zinc-700 focus-visible:outline-none focus-visible:ring-0 focus:border-zinc-500/50 transition-all resize-none font-light leading-relaxed text-xl"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16 flex items-center justify-between pb-12">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                disabled={currentStep === 0 || loading} 
                className={cn(
                  "flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all duration-300 font-bold uppercase tracking-[0.3em] text-[10px] outline-none cursor-pointer",
                  currentStep === 0 
                    ? "opacity-0 pointer-events-none" 
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-900/80 active:scale-95 shadow-sm"
                )}
              >
                <ArrowLeft size={16} /> Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <LiquidCtaButton onClick={() => setCurrentStep(prev => prev + 1)} className={cn(currentStep === 0 && !isStep1Valid && "opacity-50 grayscale pointer-events-none")}>
                  Proceed to Next
                </LiquidCtaButton>
              ) : (
                <LiquidCtaButton onClick={handleGenerate} className={cn((!isFinalValid || loading) && "opacity-50 grayscale pointer-events-none")}>
                  {loading ? "Analyzing..." : "Generate Briefing"}
                </LiquidCtaButton>
              )}
            </div>


            <SynthesisEngine loading={loading} />
          </div>
        </section>
      </main>
    </div>
  );
};

const StatusBadge = ({ children, color = "zinc" }) => {
  const colors = {
    zinc: "bg-zinc-900 border-zinc-800 text-zinc-500",
    green: "bg-green-950/20 border-green-500/20 text-green-400",
    red: "bg-red-950/20 border-red-500/20 text-red-400",
    blue: "bg-blue-950/20 border-blue-500/20 text-blue-400"
  };
  return (
    <span className={cn("px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest", colors[color])}>
      {children}
    </span>
  );
};

const ErrorState = ({ error }) => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-black p-6 text-center">
    <AlertCircle size={64} className="text-red-500 mb-8" />
    <h1 className="font-display text-4xl font-bold text-white mb-4 uppercase tracking-tighter">System_Failure</h1>
    <p className="text-zinc-500 text-lg font-light mb-12">{error || "Could not initialize generator."}</p>
    <Link to="/"><button className="px-10 py-3 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-md hover:bg-zinc-200 transition-all cursor-pointer">Reboot_System</button></Link>
  </div>
);

export default GenerateReport;
