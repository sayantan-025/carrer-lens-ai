import React from "react";
import { useAuth } from "../hooks/use-auth";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 py-12 bg-black selection:bg-white/20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-zinc-900/20 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl mx-auto relative group overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <div className="size-24 md:size-32 rounded-full bg-zinc-800/50 flex items-center justify-center border-2 border-white/10 overflow-hidden shadow-inner">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <User size={48} className="text-white/60" />
              )}
            </div>
            <div className="absolute bottom-1 right-1 size-7 bg-white rounded-full border-4 border-zinc-950 flex items-center justify-center shadow-xl" title="Verified Protocol">
              <CheckCircle2 size={14} className="text-black" />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-display font-bold text-white tracking-tighter">{user.name}</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mt-1">Status: Career Enthusiast</p>
          </div>

          <div className="md:ml-auto flex items-center gap-4">
            <Logo size={40} className="hidden md:flex opacity-30 hover:opacity-100 transition-opacity duration-500" />
            <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/5 px-6 py-3 rounded-full hover:bg-white/10 hover:border-white/20 active:scale-95">
              <ArrowLeft size={14} /> Back
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: "Email Address", value: user.email },
            { icon: Calendar, label: "Account Status", value: "Verified Account" },
            { icon: Shield, label: "Role", value: "Job Seeker" },
            { icon: User, label: "Username", value: user.name }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ 
                y: -4, 
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)"
              }}
              className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col gap-1 group/item transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-zinc-600 mb-2 group-hover/item:text-zinc-400 transition-colors">
                <item.icon size={14} className="transition-transform duration-300 group-hover/item:scale-110" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-white font-medium tracking-tight group-hover/item:text-white transition-colors">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link 
            to="/change-password"
            className="group/btn relative flex-1 bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white font-bold py-4 rounded-xl text-center transition-all overflow-hidden active:scale-98"
          >
            <span className="relative z-10">Change Password</span>
            <BottomGradient />
          </Link>
          <Link 
            to="/generate-report"
            className="group/btn relative flex-1 bg-white hover:bg-zinc-100 text-black font-bold py-4 rounded-xl text-center transition-all shadow-xl shadow-white/5 overflow-hidden active:scale-98"
          >
            <span className="relative z-10">Create New Report</span>
            <BottomGradient />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default Profile;
