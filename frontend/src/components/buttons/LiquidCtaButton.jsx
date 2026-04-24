import React from "react"
import { LiquidMetalBorder } from "../ui/LiquidMetalBorder"
import { cn } from "../../lib/utils"

export function LiquidCtaButton({ 
  children, 
  className, 
  onClick, 
  type = "button", 
  disabled = false, 
  theme = "dark",
  loading = false,
  loadingChild 
}) {
  const isLight = theme === "light"

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "group transition-transform duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none", 
        className
      )}
    >
      <div className={cn("rounded-full", isLight && "shadow-[0_8px_20px_rgba(0,0,0,0.25)]")}>
        <LiquidMetalBorder borderRadius={9999} borderWidth={2} theme={theme} opacity={1} speed={1.2} scale={3}>
          <div
            className={cn(
              "flex items-center justify-center px-8 h-[56px] rounded-full relative overflow-hidden",
              isLight
                ? "bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300"
                : "bg-zinc-900",
            )}
          >
            {/* Stable Layout Grid */}
            <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full">
              {/* Primary Label - Restored original text styles */}
              <span className={cn(
                "col-start-1 row-start-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity duration-300", 
                isLight ? "text-zinc-600" : "text-zinc-200",
                loading ? "opacity-0" : "opacity-100"
              )}>
                {children}
              </span>

              {/* Loader Overlay */}
              {loading && (
                <div className="col-start-1 row-start-1 flex items-center justify-center animate-in fade-in duration-300">
                  {loadingChild || children}
                </div>
              )}
            </div>
          </div>
        </LiquidMetalBorder>
      </div>
    </button>
  )
}
