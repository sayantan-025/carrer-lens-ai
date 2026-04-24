import React from "react"
import { LiquidMetalBorder } from "../ui/LiquidMetalBorder"
import { cn } from "../../lib/utils"

export function LiquidCtaButton({ children, className, onClick, type = "button", disabled = false, theme = "dark" }) {
  const isLight = theme === "light"

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group transition-transform duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none", 
        className
      )}
    >
      <div className={cn("rounded-full", isLight && "shadow-[0_8px_20px_rgba(0,0,0,0.25)]")}>
        <LiquidMetalBorder borderRadius={9999} borderWidth={2} theme={theme} opacity={1} speed={1.2} scale={3}>
          <div
            className={cn(
              "flex items-center justify-center px-8 py-4 rounded-full min-h-[56px]",
              isLight
                ? "bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300"
                : "bg-zinc-900",
            )}
          >
            <span className={cn(
              "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors", 
              isLight ? "text-zinc-600" : "text-zinc-200"
            )}>
              {children}
            </span>
          </div>
        </LiquidMetalBorder>
      </div>
    </button>
  )
}
