import React from "react";
import { cn } from "../../lib/utils";

const Spinner = ({ className, size = "md" }) => {
  const sizes = {
    sm: "size-4 border-2",
    md: "size-6 border-2",
    lg: "size-10 border-[3px]",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-zinc-800 border-t-zinc-200",
        sizes[size],
        className
      )}
    />
  );
};

export { Spinner };
