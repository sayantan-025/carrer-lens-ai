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
  Info,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Clock,
  ChevronRight
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";
import { Spinner } from "../../../components/ui/spinner";
import { DotLoader } from "../../../components/ui/dot-loader";
import { ProgressBar } from "../../../components/ui/progress-bar";
import SoftAurora from "../../../components/ui/SoftAurora";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";

// --- Main Page ---

const steps = [
  { id: "target", title: "Job Description", description: "Paste the target job description to analyze requirements.", icon: Target },
  { id: "resume", title: "Resume & Self Description", description: "Provide your resume and optional self description for context.", icon: FileText }
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

  // Progress percentage
  const progressValue = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  // Validation Logic
  const isStep1Valid = useMemo(() => formData.jobDescription.trim().length >= 50, [formData.jobDescription]);
  const isStep2Valid = useMemo(() => formData.resumeFile !== null || formData.selfDescription.trim().length >= 20, [formData.resumeFile, formData.selfDescription]);
  
  const canProceed = useMemo(() => {
    if (currentStep === 0) return isStep1Valid;
    if (currentStep === 1) return isStep2Valid;
    return true;
  }, [currentStep, isStep1Valid, isStep2Valid]);

  const isFinalValid = useMemo(() => isStep1Valid && isStep2Valid, [isStep1Valid, isStep2Valid]);

  const handleFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setFormData(prev => ({ ...prev, resumeFile: file }));
      showToast({ message: "Resume uploaded.", type: "success" });
    } else {
      showToast({ message: "Please upload a PDF.", type: "error" });
    }
  };

  const handleGenerate = async () => {
    if (!isFinalValid) return;
    try {
      const result = await generateReport(formData);
      if (result) {
        showToast({ message: "Report generated.", type: "success" });
        navigate(`/dashboard/${result._id}`);
      }
    } catch (err) { 
      showToast({ message: "Generation failed.", type: "error" }); 
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="h-screen w-full bg-black text-zinc-400 font-sans selection:bg-white/10 relative overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
        <SoftAurora speed={0.4} color1="#18181b" color2="#000000" />
      </div>

      {/* Header */}
      <header className="shrink-0 h-16 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="h-6 w-6" />
            <span className="font-display text-base font-bold text-white tracking-tighter">CareerLens<span className="text-zinc-500">AI</span></span>
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <h2 className="text-xs font-bold text-zinc-100 tracking-tight uppercase">New Analysis</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
             <ShieldCheck size={12} className="text-white/40" />
             Private Session
           </div>
        </div>
      </header>

      {/* Top Progress Bar */}
      <div className="shrink-0 bg-black/40">
        <ProgressBar value={progressValue} />
      </div>

      <main className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="col-span-3 border-r border-white/5 bg-zinc-950/20 flex flex-col min-h-0 overflow-y-auto scrollbar-hidden">
          
          {/* Steps */}
          <div className="p-8 space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 px-2 uppercase tracking-[0.2em] mb-4">Steps</p>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              const isLocked = (index === 1 && !isStep1Valid);

              return (
                <div key={step.id} className={cn(
                  "relative group w-full flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all duration-300",
                  isActive ? "bg-white/[0.03] border-white/10 text-white" : "bg-transparent border-transparent text-zinc-500",
                  isLocked && index > currentStep && "opacity-30 grayscale"
                )}>
                  <div className={cn(
                    "size-9 rounded-xl flex items-center justify-center border transition-all duration-500", 
                    isActive ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : isCompleted ? "bg-zinc-800/50 border-white/5 text-white" : "bg-zinc-900/50 border-white/5"
                  )}>
                    {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[11px] font-bold tracking-tight">{step.title}</span>
                  </div>
                  {isActive && (
                    <motion.div layoutId="activeStep" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Validation Requirements Card (Replaces AI Insight) */}
          <div className="px-8 pb-4">
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-[2rem] relative overflow-hidden group transition-all duration-500">
              <div className="flex items-center gap-2 text-zinc-300 mb-6">
                 <ShieldCheck size={14} className="text-white/40" />
                 <span className="text-[11px] font-bold uppercase tracking-wider">System Rules</span>
              </div>
              
              <div className="space-y-4">
                {currentStep === 0 ? (
                  <div className={cn(
                    "flex items-start gap-3 transition-colors",
                    isStep1Valid ? "text-white" : "text-zinc-600"
                  )}>
                    <div className={cn(
                      "size-1.5 rounded-full mt-1.5 transition-all duration-500",
                      isStep1Valid ? "bg-white shadow-[0_0_8px_white]" : "bg-zinc-800"
                    )} />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-widest">Min. 50 characters</span>
                      <span className="text-[9px] font-medium opacity-40 mt-1 leading-relaxed">Detailed job description ensures precise matching.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={cn(
                      "flex items-start gap-3 transition-colors",
                      (formData.resumeFile || formData.selfDescription.trim().length >= 20) ? "text-white" : "text-zinc-600"
                    )}>
                      <div className={cn(
                        "size-1.5 rounded-full mt-1.5 transition-all duration-500",
                        (formData.resumeFile || formData.selfDescription.trim().length >= 20) ? "bg-white shadow-[0_0_8px_white]" : "bg-zinc-800"
                      )} />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-wrap">Resume PDF or Description</span>
                      </div>
                    </div>
                    
                    {!formData.resumeFile && (
                      <div className={cn(
                        "flex items-start gap-3 ml-4 transition-colors",
                        formData.selfDescription.trim().length >= 20 ? "text-zinc-400" : "text-zinc-700"
                      )}>
                        <div className={cn(
                          "size-1 rounded-full mt-1.5",
                          formData.selfDescription.trim().length >= 20 ? "bg-zinc-500" : "bg-zinc-800"
                        )} />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest italic">Min. 20 characters</span>
                          <span className="text-[9px] font-medium opacity-30 mt-1 leading-relaxed italic">Required for AI context mapping.</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Past Reports */}
          <div className="px-8 pb-8 mt-2 flex-1 flex flex-col">
            <div className="border-t border-white/5 pt-6 flex-1 flex flex-col">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Clock size={10} /> History
              </p>
              
              {reports && reports.length > 0 ? (
                <div className="space-y-2">
                  {reports.slice(0, 5).map((report) => (
                    <Link
                      key={report._id}
                      to={`/dashboard/${report._id}`}
                      className="group flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors truncate">
                          {report.title || "Untitled Analysis"}
                        </p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">
                          {formatDate(report.createdAt)} · {report.matchScore ?? "—"}%
                        </p>
                      </div>
                      <ChevronRight size={12} className="text-zinc-700 group-hover:text-zinc-400 shrink-0 ml-2 transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[2rem] p-8 opacity-40">
                  <div className="size-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
                    <Clock size={16} className="text-zinc-800" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 text-center leading-relaxed">
                    Terminal idle <br /> No logs detected
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Input Area */}
        <section className="col-span-9 flex flex-col min-h-0 bg-black/40 p-16 overflow-y-auto scrollbar-hidden">
          <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
            <div className="mb-14">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center gap-3 mb-6"
               >
                  <div className="h-px w-6 bg-white/20" />
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Module {currentStep + 1}</span>
               </motion.div>
               <h1 className="font-display text-6xl font-bold text-white tracking-tighter leading-tight mb-4">
                 {steps[currentStep].title}
               </h1>
               <p className="text-zinc-500 text-2xl font-light leading-relaxed max-w-2xl">
                 {steps[currentStep].description}
               </p>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentStep} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }} 
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                  className="h-full"
                >
                  {currentStep === 0 && (
                    <div className="relative group h-[400px]">
                      <textarea
                        id="job-description-input"
                        placeholder="Paste the Job Description details..."
                        value={formData.jobDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                        className="w-full h-full bg-zinc-900/20 rounded-[2.5rem] p-10 text-zinc-100 placeholder:text-zinc-800 focus:outline-none focus:ring-0 border border-white/5 focus:border-white/10 transition-all resize-none font-light leading-relaxed text-2xl scrollbar-hidden"
                      />
                      <div className={cn(
                        "absolute bottom-8 right-10 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors",
                        isStep1Valid ? "text-white/60" : "text-zinc-800"
                      )}>
                        {formData.jobDescription.length} <span className="opacity-40">/ 50 MIN</span>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="grid grid-cols-2 gap-8 h-[400px]">
                      {/* Resume Upload */}
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center gap-8 transition-all duration-500 cursor-pointer relative overflow-hidden group/upload",
                          formData.resumeFile ? 'border-white/40 bg-white/[0.03]' : isDragging ? 'border-white/40 bg-white/[0.03]' : 'border-white/5 bg-zinc-900/10 hover:border-white/20 hover:bg-zinc-900/20'
                        )}
                      >
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files[0])} accept=".pdf" className="hidden" />
                        <div className={cn(
                          "size-24 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center transition-all duration-700", 
                          (isDragging || formData.resumeFile) && "scale-110 border-white/20"
                        )}>
                          {formData.resumeFile ? <FileCheck size={48} className="text-white" /> : <Upload size={48} className="text-zinc-800 group-hover/upload:text-zinc-500 transition-colors" />}
                        </div>
                        <div className="text-center px-4">
                          <p className="text-white font-bold text-xl tracking-tight">
                            {formData.resumeFile ? formData.resumeFile.name : "Resume.pdf"}
                          </p>
                          <p className="text-zinc-500 text-xs font-light mt-3 uppercase tracking-widest">
                            {formData.resumeFile ? "FILE SECURED" : "SELECT PDF FILE"}
                          </p>
                        </div>
                      </div>

                      {/* Self Description Alternative */}
                      <div className="relative group">
                        <textarea
                          id="self-description-input"
                          placeholder="Or provide a brief self description..."
                          value={formData.selfDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, selfDescription: e.target.value }))}
                          className="w-full h-full bg-zinc-900/20 rounded-[2.5rem] p-10 text-zinc-100 placeholder:text-zinc-800 focus:outline-none focus:ring-0 border border-white/5 focus:border-white/10 transition-all resize-none font-light leading-relaxed text-xl scrollbar-hidden"
                        />
                        <div className={cn(
                          "absolute bottom-6 right-8 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors",
                          formData.selfDescription.length >= 20 ? "text-white/60" : "text-zinc-800"
                        )}>
                          {formData.selfDescription.length} <span className="opacity-40">/ 20 MIN</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16 flex items-center justify-center gap-12 pb-12">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                disabled={currentStep === 0 || loading} 
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 font-bold uppercase tracking-[0.2em] text-[11px] outline-none cursor-pointer",
                  currentStep === 0 
                    ? "hidden" 
                    : "bg-zinc-900/50 text-zinc-500 hover:text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <ArrowLeft size={16} /> Back
              </button>

              {currentStep < steps.length - 1 ? (
                <div className="shrink-0">
                  <LiquidCtaButton 
                    onClick={() => setCurrentStep(prev => prev + 1)} 
                    className={cn(!canProceed && "opacity-50 grayscale pointer-events-none")}
                  >
                    Continue
                  </LiquidCtaButton>
                </div>
              ) : (
                <div className="shrink-0 min-w-[240px]">
                  <LiquidCtaButton 
                    onClick={handleGenerate} 
                    className={cn(!isFinalValid && "opacity-50 grayscale pointer-events-none")}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <DotLoader />
                        <span>Analyzing context...</span>
                      </div>
                    ) : "Generate Analysis"}
                  </LiquidCtaButton>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default GenerateReport;
