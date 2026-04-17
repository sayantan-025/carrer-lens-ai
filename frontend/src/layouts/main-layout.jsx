import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../landing-page/components/navbar";
import Footer from "../landing-page/components/footer";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(140, 255, 46, 0.08), transparent 40%)`;

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="flex flex-col min-h-screen font-sans text-white selection:bg-brand-neon/30 relative"
    >
      {/* Universal Next-Gen Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-neon/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-neon/10 blur-[150px]" />
        
        {/* Interactive Spotlight */}
        <motion.div 
          className="absolute inset-0 z-0 bg-brand-neon/[0.03] opacity-0 md:opacity-100"
          style={{ background }}
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
        
   
          <div className="w-full relative z-10 pt-10">
            <Footer />
          </div>
    
      </div>
    </div>
  );
};

export default MainLayout;
