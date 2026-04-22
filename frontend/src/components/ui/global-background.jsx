import React from "react";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none bg-[#020B18]">
      {/* Primary Brand Glow */}
      <div className="absolute rounded-full bottom-[-10%] right-[-5%] size-[600px] bg-blue-600 blur-[180px] opacity-20" />
      
      {/* Secondary Accent Glow */}
      <div className="absolute rounded-full bottom-[-10%] left-[-10%] size-[500px] bg-indigo-700 blur-[160px] opacity-15" />
      
      {/* Top Center Perspective Glow */}
      <div className="absolute rounded-full top-[10%] left-1/2 -translate-x-1/2 size-[700px] bg-blue-500 blur-[200px] opacity-10" />
      
      {/* Subtle Noise/Grain for Depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  );
};

export default GlobalBackground;
