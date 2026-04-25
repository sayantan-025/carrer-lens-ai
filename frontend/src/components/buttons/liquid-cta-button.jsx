import React from "react"
import { ArrowRight } from "lucide-react"
import { LiquidMetalBorder } from "../ui/liquid-metal-border"
import { cn } from "../../lib/utils"
import { Spinner } from "../ui/spinner"

export function LiquidCtaButton({ 
  children, 
  className, 
  onClick, 
  type = "button", 
  disabled = false, 
  theme = "dark",
  loading = false,
  loadingText,
  icon: Icon = ArrowRight,
  showIcon = true,
  fullWidth = false
}) {
  const isLight = theme === "light"

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "group transition-transform duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none", 
        fullWidth ? "w-full" : "w-fit",
        className
      )}
    >
      <div className={cn("rounded-full", isLight && "shadow-[0_8px_20px_rgba(0,0,0,0.25)]", fullWidth && "w-full")}>
        <LiquidMetalBorder borderRadius={9999} borderWidth={2} theme={theme} opacity={1} speed={1.2} scale={3}>
          <div
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 rounded-full relative overflow-hidden",
              isLight
                ? "bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300"
                : "bg-gradient-to-b from-zinc-800 to-zinc-900",
              fullWidth && "w-full"
            )}
          >
            <div className="flex items-center justify-center gap-2.5">
              {loading ? (
                <>
                  <Spinner size="sm" className={isLight ? "border-zinc-400 border-t-zinc-800" : "border-zinc-800 border-t-zinc-200"} />
                  <span className={cn("text-sm font-medium tracking-tight", isLight ? "text-zinc-800" : "text-zinc-100")}>
                    {loadingText || "Processing..."}
                  </span>
                </>
              ) : (
                <>
                  <span className={cn("text-sm font-medium tracking-tight transition-colors whitespace-nowrap", isLight ? "text-zinc-600" : "text-zinc-200")}>
                    {children}
                  </span>
                  {showIcon && Icon && (
                    <Icon
                      className={cn(
                        "w-4 h-4 group-hover:translate-x-0.5 transition-all duration-300 shrink-0",
                        isLight ? "text-zinc-600" : "text-zinc-200",
                      )}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </LiquidMetalBorder>
      </div>
    </button>
  )
}
