import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info, Bell } from "lucide-react";
import { cn } from "../../lib/utils";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="size-4 text-zinc-100" />,
    error: <AlertCircle className="size-4 text-zinc-100" />,
    info: <Info className="size-4 text-zinc-100" />,
    default: <Bell className="size-4 text-zinc-100" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl min-w-[320px] max-w-md relative overflow-hidden group shadow-2xl",
        type === "error" ? "border-red-500/20 shadow-red-500/5" : "shadow-white/5"
      )}
    >
      {/* Auto-dismiss Progress Bar */}
      <motion.div 
        initial={{ width: "100%" }}
        animate={{ width: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={cn(
          "absolute bottom-0 left-0 h-0.5",
          type === "error" ? "bg-red-500/40" : "bg-white/20"
        )}
      />

      <div className={cn(
        "shrink-0 p-2.5 rounded-xl border flex items-center justify-center shadow-lg",
        type === "error" ? "bg-red-950/20 border-red-500/20" : "bg-zinc-900 border-white/5"
      )}>
        {icons[type] || icons.default}
      </div>
      
      <div className="flex-1 min-w-0 py-1">
        <p className="text-[13px] font-medium text-zinc-100 leading-tight">
          {message}
        </p>
        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mt-1.5">
            System Notification
        </p>
      </div>

      <button 
        onClick={onClose}
        className="shrink-0 p-1.5 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all cursor-pointer active:scale-90"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-8 right-8 z-[9999] flex flex-col gap-3 items-end">
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
