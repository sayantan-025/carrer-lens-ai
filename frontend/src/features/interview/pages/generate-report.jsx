import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Target, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  FileCheck,
  Zap,
  AlertCircle,
  PenLine,
  History,
  Calendar,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useInterview } from "../hooks/use-interview";
import { useToast } from "../../../context/toast-context";

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
    <div className="min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto px-4 pt-12 pb-32 flex flex-col gap-20">
      
      {/* --- SECTION 1: GENERATION ENGINE --- */}
      <section className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-wide uppercase mb-4"
          >
            <Sparkles className="size-4" />
            AI Strategy Engine
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Generate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Interview Blueprint</span>
          </motion.h1>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Step Indicators */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Setup Progress</span>
                  <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-linear-to-r from-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;

                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className={`
                        shrink-0 size-10 rounded-xl flex items-center justify-center transition-all duration-300
                        ${isActive ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/20' : 
                          isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-600'}
                      `}>
                        {isCompleted ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" />}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-600'}`}>
                          Step {index + 1}
                        </span>
                        <span className={`font-medium ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
                          {step.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 border border-white/10 bg-blue-500/5">
              <div className="flex gap-3 text-blue-400 mb-3">
                <Zap className="size-5 shrink-0" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-white">Requirement</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                Job Description is <strong>required</strong>. You must also provide either a Resume PDF <strong>OR</strong> a Bio description to generate the strategy.
              </p>
            </div>
          </div>

          {/* Right: Active Step Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-[32px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-white">
                  {React.createElement(steps[currentStep].icon, { size: 120 })}
                </div>

                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
                  <p className="text-gray-400">{steps[currentStep].description}</p>
                </div>

                {/* Step 1: Job Description */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="relative group">
                      <textarea
                        placeholder="Paste the full job description here... (Min 50 characters)"
                        value={formData.jobDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                        className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all resize-none font-medium"
                      />
                      <div className={`absolute bottom-4 right-6 text-[10px] font-bold uppercase tracking-widest ${isStep1Valid ? 'text-green-500' : 'text-gray-600'}`}>
                        {formData.jobDescription.length} / 50 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Resume Upload */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group
                        ${formData.resumeFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'}
                      `}
                    >
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                      
                      {formData.resumeFile ? (
                        <>
                          <div className="size-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                            <FileCheck size={32} />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold text-lg">{formData.resumeFile.name}</p>
                            <p className="text-green-500 text-sm font-medium uppercase tracking-widest">Ready for analysis</p>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, resumeFile: null })); }}
                            className="text-xs text-gray-500 hover:text-red-400 font-bold uppercase tracking-widest mt-2 underline"
                          >
                            Remove file
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
                            <Upload size={32} />
                          </div>
                          <div className="text-center">
                            <p className="text-white font-bold text-lg">Drop your resume here</p>
                            <p className="text-gray-400 text-sm italic">Optional if you provide a bio in the next step</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Self Description */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        placeholder="e.g. 'I am pivoting from Backend to Fullstack. I'm worried about my lack of frontend experience...'"
                        value={formData.selfDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, selfDescription: e.target.value }))}
                        className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none font-medium"
                      />
                    </div>
                    {!formData.resumeFile && formData.selfDescription.length < 20 && (
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-500 text-xs font-bold uppercase tracking-wide">
                        <AlertCircle className="size-4 shrink-0" />
                        Since no resume is uploaded, a bio (min 20 chars) is required.
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-12 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0 || loading}
                    className={`
                      flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-all
                      ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-white'}
                    `}
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      whileHover={isStep1Valid || currentStep > 0 ? { scale: 1.02 } : {}}
                      whileTap={isStep1Valid || currentStep > 0 ? { scale: 0.98 } : {}}
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      disabled={currentStep === 0 && !isStep1Valid}
                      className={`
                        btn px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl
                        ${(currentStep === 0 && !isStep1Valid) ? 'bg-white/5 text-gray-600 cursor-not-allowed border-none' : 'bg-blue-600 text-white hover:bg-blue-700 border-none shadow-blue-900/20'}
                      `}
                    >
                      Next Step <ArrowRight className="size-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={isFinalValid && !loading ? { scale: 1.02 } : {}}
                      whileTap={isFinalValid && !loading ? { scale: 0.98 } : {}}
                      onClick={handleGenerate}
                      disabled={!isFinalValid || loading}
                      className={`
                        btn px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl relative overflow-hidden border-none
                        ${!isFinalValid || loading
                          ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                          : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-indigo-900/40 hover:brightness-110'}
                      `}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Synthesizing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-5" />
                          Generate Blueprint
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="size-1.5 rounded-full bg-blue-500"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                    Analyzing profile alignment...
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* --- DIVIDER --- */}
      <div className="relative py-4 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative px-6 bg-[#020B18] flex items-center gap-3">
           <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Mission Archives</span>
           <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
        </div>
      </div>

      {/* --- SECTION 2: MISSION ARCHIVES --- */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Briefings</h2>
            <p className="text-sm text-gray-500">Quick access to your previously synthesized strategies.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {reports?.length > 0 ? (
            reports.map((report, i) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <Link to={`/dashboard/${report._id}`}>
                  <div className="glass rounded-[32px] p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-blue-500/30 transition-all h-full flex flex-col gap-6 group-hover:-translate-y-1 shadow-2xl">
                    <div className="flex justify-between items-start">
                      <div className="size-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <LayoutDashboard size={20} />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Match Score</div>
                        <div className="text-2xl font-black text-white">{report.matchScore}%</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={12} />
                        {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Protocol Active</span>
                      <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 glass rounded-[32px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-white font-bold mb-1">No Briefings Found</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Generate your first interview strategy to see it archived here for quick access.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GenerateReport;
