import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const ProgressBar = ({ value, className }) => {
  return (
    <div className={cn("h-1 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      />
    </div>
  );
};

export { ProgressBar };
