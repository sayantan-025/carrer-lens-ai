import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

const icons = {
  success: <CheckCircle2 className="text-brand-neon w-5 h-5" />,
  error: <AlertCircle className="text-red-400 w-5 h-5" />,
  info: <Info className="text-zinc-400 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-400 w-5 h-5" />,
};

const colors = {
  success: "border-brand-neon/20 bg-brand-neon/5",
  error: "border-red-500/20 bg-red-500/5",
  info: "border-white/10 bg-white/5",
  warning: "border-yellow-500/20 bg-yellow-500/5",
};

const Toast = ({ message, type = "info", onClose, duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration === Infinity) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`pointer-events-auto relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-[20px] backdrop-blur-xl border ${colors[type]} shadow-2xl w-full md:min-w-[320px] group`}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      
      <p className="text-sm font-medium text-white/90 leading-relaxed pr-4">
        {message}
      </p>

      <button
        onClick={onClose}
        className="ml-auto opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
      >
        <X size={16} className="text-white" />
      </button>

      {duration !== Infinity && (
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <motion.div
            className={`h-full ${type === "success" ? "bg-brand-neon" : "bg-white/40"}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Toast;
