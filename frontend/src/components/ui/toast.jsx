import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="size-5 text-blue-400" />,
    error: <AlertCircle className="size-5 text-red-400" />,
    info: <Info className="size-5 text-indigo-400" />,
  };

  const glowColors = {
    success: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    error: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    info: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`flex items-center gap-4 p-4 rounded-2xl glass border-white/10 min-w-[320px] max-w-md ${glowColors[type]} relative overflow-hidden group`}
    >
      {/* Logic Progress Bar */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-0.5 ${
          type === "success" ? "bg-blue-500/50" : 
          type === "error" ? "bg-red-500/50" : "bg-indigo-500/50"
        }`}
      />

      <div className={`shrink-0 p-2 rounded-xl bg-white/5 border border-white/5`}>
        {icons[type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">
          {message}
        </p>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
            System Message
        </p>
      </div>

      <button 
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
