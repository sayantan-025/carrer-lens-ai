"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
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
      className={cn("group transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none", className)}
    >
      <div className={cn("rounded-full", isLight && "shadow-[0_8px_20px_rgba(0,0,0,0.25)]")}>
        <LiquidMetalBorder borderRadius={9999} borderWidth={2} theme={theme} opacity={1} speed={1.2} scale={3}>
          <div
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-3 rounded-full relative overflow-hidden",
              isLight
                ? "bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300"
                : "bg-gradient-to-b from-zinc-800 to-zinc-900",
            )}
          >
            {/* Stable Layout Grid for Loading Overlay */}
            <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full">
              {/* Primary Label and Icon */}
              <div className={cn(
                "col-start-1 row-start-1 flex items-center justify-center gap-2 transition-opacity duration-300", 
                loading ? "opacity-0" : "opacity-100"
              )}>
                <span className={cn("text-sm font-medium transition-colors", isLight ? "text-zinc-600" : "text-zinc-200")}>
                  {children}
                </span>
                <ArrowRight
                  className={cn(
                    "w-5 h-5 group-hover:translate-x-1 transition-all duration-300",
                    isLight ? "text-zinc-600" : "text-zinc-200",
                  )}
                />
              </div>

              {/* Loader Overlay */}
              {loading && (
                <div className="col-start-1 row-start-1 flex items-center justify-center animate-in fade-in duration-300">
                  {loadingChild || (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1 h-1 rounded-full bg-current animate-bounce" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </LiquidMetalBorder>
      </div>
    </button>
  )
}
