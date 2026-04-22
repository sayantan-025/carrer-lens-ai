import React from "react";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none bg-black">
      {/* Subtle brand glow to keep it from being pitch black */}
      <div className="absolute rounded-full bottom-[-10%] right-[-5%] size-[600px] bg-purple-900/10 blur-[180px]" />
      <div className="absolute rounded-full top-[10%] left-[-10%] size-[500px] bg-slate-900/20 blur-[160px]" />
      
      {/* Subtle Noise/Grain for Depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default GlobalBackground;
