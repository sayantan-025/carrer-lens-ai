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
  Command
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";
import { LiquidMetalBorder } from "../../../components/ui/LiquidMetalBorder";
import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

// --- SUB-COMPONENTS ---

/**
 * High-precision SVG-based progress gauge for monochrome Match Score.
 */
const IndustrialGauge = ({ value, size = 64 }) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg]" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="transparent"
          className="text-zinc-800/50"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-zinc-100"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-mono font-bold text-zinc-100">{value}%</span>
      </div>
    </div>
  );
};

/**
 * Encapsulates the multi-stage loading animation and status cycling.
 */
const SynthesisEngine = ({ loading }) => {
  const [stage, setStage] = useState(0);
  const stages = [
    "Initializing Protocol...",
    "Scanning Tactical Assets...",
    "Deconstructing Requirements...",
    "Aligning Profile Vectors...",
    "Synthesizing Briefing..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setStage(0);
      interval = setInterval(() => {
        setStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          <div className="relative size-24">
            {/* Outer Rotating Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-800"
            />
            {/* Inner Fast Ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border-t border-zinc-100 border-r-transparent border-b-transparent border-l-transparent"
            />
            {/* Pulsing Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="size-5 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.p 
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] font-mono font-bold text-zinc-100 uppercase tracking-[0.5em] text-center"
              >
                {stages[stage]}
              </motion.p>
            </AnimatePresence>
            <div className="w-56 h-[1px] bg-zinc-900 relative overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Individual card rendering for the Mission Archives.
 */
const ArchiveCard = ({ report, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="group h-full"
  >
    <Link to={`/dashboard/${report._id}`} className="block h-full">
      <Card className="h-full border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl hover:border-zinc-500/30 transition-all duration-500 rounded-3xl overflow-hidden group-hover:-translate-y-1">
        <CardContent className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div className="size-12 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <LayoutDashboard size={20} />
            </div>
            <IndustrialGauge value={report.matchScore} />
          </div>

          <div className="mb-8 flex-1">
            <h3 className="font-display text-xl font-bold text-zinc-100 leading-tight mb-3 group-hover:text-white transition-colors line-clamp-2">
              {report.title}
            </h3>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest">
              <Calendar size={12} className="text-zinc-600" />
              {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">PROTOCOL_ACTIVE</span>
            <div className="size-8 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-500 group-hover:text-zinc-100 group-hover:bg-zinc-700/50 transition-all">
              <ChevronRight size={16} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

// --- MAIN PAGE ---

const steps = [
  {
    id: "target",
    title: "The Opportunity",
    description: "Paste the job description you are targeting.",
    icon: Target,
  },
  {
    id: "resume",
    title: "Resume Upload",
    description: "Upload your professional resume (Optional if providing a bio).",
    icon: FileText,
  },
  {
    id: "context",
    title: "Personal Bio",
    description: "Describe your experience or specific interview goals.",
    icon: PenLine,
  }
];

const GenerateReport = () => {
  const navigate = useNavigate();
  const { generateReport, loading, reports, getReports } = useInterview();
  const { showToast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    jobDescription: "",
    resumeFile: null,
    selfDescription: ""
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    getReports();
  }, [getReports]);

  // Validation Logic
  const isStep1Valid = useMemo(() => formData.jobDescription.trim().length >= 50, [formData.jobDescription]);
  const isFinalValid = useMemo(() => {
    return isStep1Valid && (formData.resumeFile !== null || formData.selfDescription.trim().length >= 20);
  }, [isStep1Valid, formData.resumeFile, formData.selfDescription]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData(prev => ({ ...prev, resumeFile: file }));
      showToast({ message: "Resume uploaded successfully", type: "success" });
    } else {
      showToast({ message: "Please upload a valid PDF file", type: "error" });
    }
  };

  const handleGenerate = async () => {
    if (!isFinalValid) return;
    try {
      const result = await generateReport(formData);
      if (result) {
        showToast({ message: "Strategy blueprint generated!", type: "success" });
        navigate(`/dashboard/${result._id}`);
      }
    } catch (err) {
      showToast({ message: "Failed to generate report. Please try again.", type: "error" });
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-[calc(100vh-80px)] w-full max-w-6xl mx-auto px-6 pt-16 pb-32 flex flex-col gap-24">
      
      {/* --- SECTION 1: GENERATION ENGINE --- */}
      <section className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Protocol Alpha v4.2</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-3xl mx-auto">
            Generate Your <br className="hidden md:block" /> 
            <span className="text-zinc-500">Interview Blueprint</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Deploy advanced AI analysis to align your professional profile with high-stakes job requirements.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Left: Tactical Metrics & Steps */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-100" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Setup Status: {Math.round(progress)}%</div>
                </div>

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === index;
                    const isCompleted = currentStep > index;

                    return (
                      <div key={step.id} className="relative flex items-start gap-4 group" aria-current={isActive ? "step" : undefined}>
                        {index !== steps.length - 1 && (
                          <div className={cn(
                            "absolute left-5 top-10 bottom-[-20px] w-[1px] transition-colors duration-500",
                            isCompleted ? "bg-zinc-100" : "bg-zinc-800"
                          )} />
                        )}
                        <div className={cn(
                          "shrink-0 size-10 rounded-xl flex items-center justify-center border transition-all duration-500 z-10",
                          isActive ? 'bg-zinc-100 border-zinc-100 text-zinc-900 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 
                          isCompleted ? 'bg-zinc-800 border-zinc-700 text-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                        )}>
                          {isCompleted ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" />}
                        </div>
                        <div className="flex flex-col pt-1">
                          <span className={cn(
                            "text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5 transition-colors",
                            isActive ? 'text-white' : 'text-zinc-600'
                          )}>
                            Phase 0{index + 1}
                          </span>
                          <span className={cn(
                            "font-display font-bold text-sm transition-colors",
                            isActive ? 'text-zinc-100' : 'text-zinc-500'
                          )}>
                            {step.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800/50 bg-zinc-900/20 backdrop-blur-xl rounded-3xl overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 shrink-0">
                    <Zap className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2">Requirement Protocol</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">
                      Job Description (50+ chars) is <span className="text-zinc-300">mandatory</span>. Complete by uploading a Resume PDF or providing a Bio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Active Step Form */}
          <div className="lg:col-span-3">
            <LiquidMetalBorder borderRadius={32} borderWidth={1} opacity={0.3} className="h-full">
              <div className="bg-zinc-950/80 backdrop-blur-2xl rounded-[31px] p-8 md:p-10 border border-zinc-800/50 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none text-white select-none">
                  {React.createElement(steps[currentStep].icon, { size: 180 })}
                </div>

                <div className="mb-10 relative">
                  <h2 className="font-display text-3xl font-bold text-white mb-3 tracking-tight">{steps[currentStep].title}</h2>
                  <p className="text-zinc-400 text-sm font-light max-w-md">{steps[currentStep].description}</p>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full"
                    >
                      {currentStep === 0 && (
                        <div className="relative group h-full">
                          <textarea
                            placeholder="Paste the full job description here..."
                            value={formData.jobDescription}
                            onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                            className="w-full h-64 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500/50 transition-all resize-none font-light leading-relaxed"
                          />
                          <motion.div 
                            animate={isStep1Valid ? { scale: [1, 1.05, 1], color: "#f4f4f5" } : {}}
                            className={cn(
                              "absolute bottom-4 right-6 text-[10px] font-mono font-bold tracking-widest uppercase",
                              isStep1Valid ? 'text-zinc-100' : 'text-zinc-700'
                            )}
                          >
                            {formData.jobDescription.length} / 50 CHARS
                          </motion.div>
                        </div>
                      )}

                      {currentStep === 1 && (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className={cn(
                            "border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group/upload overflow-hidden relative",
                            formData.resumeFile ? 'border-zinc-500/50 bg-zinc-500/5' : 'border-zinc-800 hover:border-zinc-500/50 hover:bg-zinc-500/5'
                          )}
                        >
                          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                          {formData.resumeFile ? (
                            <>
                              <div className="size-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                                <FileCheck size={32} />
                              </div>
                              <div className="text-center">
                                <p className="text-white font-bold text-lg">{formData.resumeFile.name}</p>
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Ready for synthesis</p>
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, resumeFile: null })); }}
                                className="text-[10px] text-zinc-600 hover:text-zinc-300 font-mono font-bold uppercase tracking-widest mt-2 underline transition-colors"
                              >
                                REMOVE_FILE
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="size-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover/upload:text-zinc-100 group-hover/upload:bg-zinc-800 transition-all border border-zinc-800">
                                <Upload size={32} />
                              </div>
                              <div className="text-center">
                                <p className="text-white font-bold text-lg">Transmit Resume</p>
                                <p className="text-zinc-500 text-xs font-light mt-1 uppercase tracking-widest">PDF format preferred</p>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4 h-full">
                          <textarea
                            placeholder="Describe your goals, experience gaps, or specific areas of concern..."
                            value={formData.selfDescription}
                            onChange={(e) => setFormData(prev => ({ ...prev, selfDescription: e.target.value }))}
                            className="w-full h-64 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500/50 transition-all resize-none font-light leading-relaxed"
                          />
                          {!formData.resumeFile && formData.selfDescription.length < 20 && (
                            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                              <AlertCircle className="size-4 shrink-0 text-zinc-600" />
                              Bio minimum 20 chars required without resume
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-12 flex items-center justify-between gap-6">
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0 || loading}
                    className={cn(
                      "flex items-center gap-2 font-mono font-bold uppercase tracking-widest text-[10px] transition-all",
                      currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-600 hover:text-zinc-300'
                    )}
                  >
                    <ArrowLeft className="size-3" /> Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <LiquidCtaButton
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className={cn((currentStep === 0 && !isStep1Valid) && "opacity-50 grayscale pointer-events-none")}
                    >
                      Next Phase
                    </LiquidCtaButton>
                  ) : (
                    <LiquidCtaButton
                      onClick={handleGenerate}
                      className={cn((!isFinalValid || loading) && "opacity-50 grayscale pointer-events-none")}
                    >
                      {loading ? "Synthesizing..." : "Generate Briefing"}
                    </LiquidCtaButton>
                  )}
                </div>
              </div>
            </LiquidMetalBorder>
            
            <SynthesisEngine loading={loading} />
          </div>
        </div>
      </section>

      {/* --- DIVIDER --- */}
      <div className="relative py-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-900"></div>
        </div>
        <div className="relative px-6 bg-black flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
           <span className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-[0.5em]">MISSION ARCHIVES</span>
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* --- SECTION 2: MISSION ARCHIVES --- */}
      <section className="space-y-12 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
               <History className="w-3 h-3 text-zinc-500" />
               <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Historical Data</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-white tracking-tight">Recent Briefings</h2>
            <p className="text-zinc-500 text-lg font-light max-w-xl">Review and re-deploy your previously synthesized strategic interview blueprints.</p>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest border border-zinc-900 rounded-full px-4 py-2 bg-zinc-900/20">
             <BarChart3 className="w-3 h-3" />
             Total Briefings: {reports?.length || 0}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reports?.length > 0 ? (
            reports.map((report, i) => (
              <ArchiveCard key={report._id} report={report} index={i} />
            ))
          ) : (
            <div className="col-span-full py-24 border border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center text-center bg-zinc-900/5">
              <div className="size-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 mb-6">
                <Command size={32} />
              </div>
              <h3 className="text-zinc-400 font-display font-bold text-xl mb-2">No Briefings Archived</h3>
              <p className="text-zinc-600 text-sm max-w-xs leading-relaxed font-light">
                Archive your first operational briefing by completing the generation protocol above.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GenerateReport;
