import React from "react";
import { cn } from "../../lib/utils";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-900/50 border border-white/5", className)}
      {...props}
    />
  );
};

export { Skeleton };
