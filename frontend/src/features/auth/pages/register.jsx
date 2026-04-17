import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Lock, Mail, User } from "lucide-react";

import FullScreenLoader from "../../../components/ui/full-screen-loader";
import Logo from "../../../components/ui/logo";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ userName, email, password });
    navigate("/");
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] relative overflow-hidden px-4 selection:bg-brand-neon/30">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-neon/10 blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-neon/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10 group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
             <Logo size={48} />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-zinc-400 font-light text-sm">Join CareerLens to start your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Username</label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <User size={18} className="text-zinc-600 group-focus-within:text-brand-neon transition-colors" />
               </div>
               <input
                 type="text"
                 id="username"
                 name="username"
                 placeholder="engineer_01"
                 onChange={(e) => setUserName(e.target.value)}
                 className="w-full bg-transparent border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-neon/50 focus:bg-[#0D0D0D] transition-all font-medium"
                 required
               />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Email</label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Mail size={18} className="text-zinc-600 group-focus-within:text-brand-neon transition-colors" />
               </div>
               <input
                 type="email"
                 id="email"
                 name="email"
                 placeholder="name@example.com"
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-transparent border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-neon/50 focus:bg-[#0D0D0D] transition-all font-medium"
                 required
               />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1">Password</label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Lock size={18} className="text-zinc-600 group-focus-within:text-brand-neon transition-colors" />
               </div>
               <input
                 type="password"
                 id="password"
                 name="password"
                 placeholder="••••••••"
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-transparent border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-neon/50 focus:bg-[#0D0D0D] transition-all font-medium tracking-widest"
                 required
                 minLength={6}
               />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-brand-neon text-black rounded-2xl py-4 font-bold mt-4 flex items-center justify-center gap-2 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group/btn shadow-[0_0_20px_rgba(140,255,46,0.2)]"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-out" />
            <span className="relative z-10 flex items-center gap-2">Create account <ArrowRight size={18} /></span>
          </motion.button>
        </form>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Already have an account? <Link to="/login" className="text-white hover:text-brand-neon font-medium transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
