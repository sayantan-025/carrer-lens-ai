import React from "react";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none bg-black">
      {/* Subtle brand glow to keep it from being pitch black */}
      <div className="absolute rounded-full bottom-[-10%] right-[-5%] size-[600px] bg-purple-900/10 blur-[180px]" />
      <div className="absolute rounded-full top-[10%] left-[-10%] size-[500px] bg-slate-900/20 blur-[160px]" />
      
      {/* Subtle Noise/Grain for Depth - Local Inline Version */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

export default GlobalBackground;
