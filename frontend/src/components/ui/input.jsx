"use client";
import * as React from "react";
import { cn } from "../../lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.15),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-xl p-[1px] transition duration-300"
    >
      <input
        type={type}
        className={cn(
          `flex h-12 w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-2 text-sm text-white transition duration-400 
          placeholder:text-zinc-500 
          focus-visible:ring-[2px] focus-visible:ring-white/20 focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-50 
          dark:shadow-[0px_0px_1px_1px_#18181b]`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
Input.displayName = "Input";

export { Input };
