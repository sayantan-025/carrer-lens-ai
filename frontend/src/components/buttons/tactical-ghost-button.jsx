import React from "react"
import { cn } from "../../lib/utils"
import { Spinner } from "../ui/spinner"

export function TacticalGhostButton({ 
  children, 
  className, 
  onClick, 
  type = "button", 
  disabled = false, 
  loading = false,
  loadingText,
  icon: Icon,
  showIcon = true
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "group flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/5 hover:border-white/20 text-zinc-500 hover:text-white font-medium py-4 px-8 rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-30 disabled:pointer-events-none tracking-tight text-[11px]",
        className
      )}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="border-zinc-700 border-t-zinc-400" />
          <span>{loadingText || "Processing..."}</span>
        </>
      ) : (
        <>
          {showIcon && Icon && <Icon size={14} className="transition-colors group-hover:text-white" />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}
