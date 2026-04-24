import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const DotLoader = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 px-2 py-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -4, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="size-1.5 rounded-full bg-zinc-400"
        />
      ))}
    </div>
  );
};

export { DotLoader };
