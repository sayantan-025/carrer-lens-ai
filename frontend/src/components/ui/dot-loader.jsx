import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const DotLoader = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -3, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="size-1.5 rounded-full bg-zinc-400 shadow-[0_0_5px_rgba(161,161,170,0.3)]"
        />
      ))}
    </div>
  );
};

export { DotLoader };
