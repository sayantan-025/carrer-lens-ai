import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  UploadCloud,
  FileText,
  Zap,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Box,
  LayoutGrid,
} from "lucide-react";
import FullScreenLoader from "../../../components/ui/full-screen-loader";
import { useInterview } from "../hooks/useinterview";
import { useToast } from "../../../context/toast-context";

const GenerateReport = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const resumeInputRef = useRef();

  const handleGenerateReport = async () => {
    if (!jobDescription.trim()) {
      showToast({ message: "Please provide a job description.", type: "error" });
      return;
    }

    if (!uploadedFile && !selfDescription.trim()) {
      showToast({
        message: "Please upload a resume or provide a self-description.",
        type: "error",
      });
      return;
    }

    try {
      const resumeFile = uploadedFile;
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (data && data._id) {
        showToast({ message: "Strategy generated successfully!", type: "success" });
        navigate(`/dashboard/${data._id}`);
      }
    } catch (err) {
      showToast({
        message: err.response?.data?.message || "Failed to generate report. Please try again.",
        type: "error",
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
      showToast({ message: "Resume uploaded successfully!", type: "success" });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      showToast({ message: "Resume selected successfully!", type: "success" });
    }
  };

  if (loading) {
    return <FullScreenLoader message="Synthesizing your interview strategy..." />;
  }

  return (
    <div className="w-full relative flex flex-col flex-1">

      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 pt-40 pb-10 flex flex-col gap-12 flex-1">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/5"
          >
            <Sparkles size={14} className="text-brand-neon" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Next-Gen AI Pipeline
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Engineer Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-neon to-white bg-[length:200%_auto] animate-pulse-slow">
              Interview Success
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl font-light">
            Deploy our proprietary AI to map your unique profile against any job
            description. Generate actionable, hyper-personalized strategies in
            seconds.
          </p>
        </motion.div>

        {/* Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Left Column: Job Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)", backgroundColor: "rgba(13, 13, 13, 0.9)" }}
            className="lg:col-span-7 flex flex-col h-full bg-[#0a0a0a] border border-white/5 transition-all duration-300 rounded-3xl overflow-hidden relative group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <Briefcase size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Target Position
                  </h2>
                  <p className="text-xs text-white/40 mt-1">
                    Paste the requirements
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-brand-neon/10 text-brand-neon border border-brand-neon/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Step 01
              </span>
            </div>

            <div className="p-8 flex-1 flex flex-col relative focus-within:bg-[#0D0D0D] transition-colors rounded-b-3xl">
              <div className="absolute left-8 top-8 bottom-8 w-8 flex flex-col text-[#222] font-mono text-xs items-end pr-2 select-none pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full flex-1 bg-transparent border-none text-white/90 placeholder:text-white/20 focus:ring-0 resize-none font-light leading-loose pl-10 h-[350px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none"
                placeholder="Paste the full job description here...&#10;&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              />
              <div className="absolute bottom-6 right-6 text-[10px] text-white/30 font-mono bg-black/50 px-2 py-1 rounded">
                {jobDescription.length} / 5000
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Input */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Resume Dropzone */}
            <motion.div
              whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
              className={`bg-[#0a0a0a] border ${isDragging ? "border-brand-neon bg-brand-neon/5 scale-[1.02]" : "border-white/5 hover:border-white/10"} rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="absolute top-[-20px] right-[-20px] p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <Box size={140} className="text-brand-neon rotate-12" />
              </div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20 shadow-inner">
                    <UploadCloud size={18} className="text-brand-neon" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Your Profile
                    </h2>
                    <p className="text-xs text-brand-neon/70 mt-1">
                      Recommended
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/5 text-white/50 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Step 02
                </span>
              </div>

              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-brand-neon/50 hover:bg-brand-neon/[0.02] transition-all relative z-10"
              >
                <AnimatePresence mode="wait">
                  {uploadedFile ? (
                    <motion.div
                      key="file-uploaded"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-12 h-12 bg-brand-neon/20 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="text-brand-neon" size={24} />
                      </div>
                      <p className="text-sm text-white font-medium truncate max-w-[200px]">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="file-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud
                          size={20}
                          className="text-white/40 group-hover:text-brand-neon"
                        />
                      </div>
                      <p className="text-sm font-medium text-white/80">
                        Drop your resume here
                      </p>
                      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                        PDF or DOCX
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <input
                  ref={resumeInputRef}
                  onChange={handleFileChange}
                  hidden
                  type="file"
                  id="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </motion.div>

            {/* Self Description Fallback */}
            <motion.div 
               whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
               className="bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-3xl p-8 flex-1 flex flex-col transition-all duration-300 focus-within:border-brand-neon/30 focus-within:bg-[#111] group"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText size={16} className="text-white/30" />
                <h3 className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                  Or write a quick bio
                </h3>
              </div>
              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                className="w-full flex-1 bg-transparent border-none rounded-xl p-0 text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-0 resize-none text-sm font-light leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                placeholder="I'm a frontend engineer with 5 years of React experience, focusing on performance optimization. Previously at Meta..."
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Action Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="sticky bottom-8 mx-auto w-[90%] max-w-3xl z-50 mt-8"
        >
          <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-3xl flex items-center justify-between hover:border-brand-neon/30 transition-all">
            <div className="hidden sm:flex items-center gap-3 px-6">
              <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse shadow-[0_0_10px_#8CFF2E]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 tracking-widest">
                  STATUS
                </span>
                <span className="text-xs font-semibold text-white tracking-wider">
                  SYSTEM READY
                </span>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              className="w-full sm:w-auto bg-brand-neon text-black px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold group relative overflow-hidden shadow-[0_0_20px_rgba(140,255,46,0.2)]"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
              <Zap
                size={18}
                className="fill-black group-hover:scale-110 transition-transform"
              />
              <span>Synthesize Strategy</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Reports Section with LayoutGrid */}
      <div className="relative z-10 border-t border-white/5 pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <LayoutGrid className="text-white" size={18} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Archives
              </h2>
            </div>
          </div>

          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, idx) => (
                <motion.div
                  key={report._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -5,
                    borderColor: "rgba(140, 255, 46, 0.3)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate(`/dashboard/${report._id}`)}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 transition-all duration-300 cursor-pointer group flex flex-col h-full shadow-lg"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider ${report.matchScore >= 80 ? "bg-brand-neon/10 text-brand-neon border border-brand-neon/20 shadow-[0_0_10px_rgba(140,255,46,0.1)]" : "bg-white/10 text-white/60 border border-white/10"}`}
                    >
                      {report.matchScore}% MATCH
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-neon group-hover:text-black transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 group-hover:text-white mb-3 leading-snug">
                    {report.title || "Unknown Protocol"}
                  </h3>
                  <p className="text-xs text-white/40 mt-auto font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center text-center px-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Box size={32} className="text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Reports Synthesized Yet</h3>
              <p className="text-white/40 max-w-sm text-sm font-light">
                Your future interview strategies will be archived here. Start by uploading your resume above.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
