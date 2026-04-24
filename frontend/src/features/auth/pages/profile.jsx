import React from "react";
import { useAuth } from "../hooks/use-auth";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, ArrowLeft, CheckCircle2, Settings } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../components/ui/logo";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";

const ProfileSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto py-12 px-6 relative z-10">
    <div className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16 relative">
        <Skeleton className="size-32 md:size-40 rounded-[2.5rem]" />
        <div className="text-center md:text-left space-y-4 flex-1">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <Skeleton className="h-12 w-32 rounded-2xl md:ml-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-[2rem]" />)}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <Skeleton className="h-14 w-48 rounded-[2rem]" />
        <Skeleton className="h-14 w-48 rounded-[2rem]" />
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 relative">
          <div className="relative group">
            <div className="size-32 md:size-40 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-white/20 shadow-2xl">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="size-full object-cover transition-all duration-700 group-hover:scale-110" />
              ) : (
                <User size={64} className="text-zinc-800 transition-colors group-hover:text-zinc-500 duration-500" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 size-10 bg-white rounded-2xl border-4 border-[#050505] flex items-center justify-center shadow-[0_0_20px_white/20]" title="Verified Account">
              <CheckCircle2 size={18} className="text-black" />
            </div>
          </div>
          
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">
                User Profile
              </span>
            </div>
            <h1 className="text-5xl font-display font-bold text-white tracking-tighter leading-none">{user.name}</h1>
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.3em]">Status: Active</p>
          </div>

          <div className="md:ml-auto">
            <Link to="/" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest bg-zinc-900/50 border border-white/5 px-8 py-4 rounded-2xl hover:border-white/20 cursor-pointer active:scale-95">
              <ArrowLeft size={14} /> Back
            </Link>
          </div>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Mail, label: "Email Address", value: user.email },
            { icon: Calendar, label: "Member Since", value: "Verified Account" },
            { icon: Shield, label: "Account Type", value: "Standard Unit" },
            { icon: User, label: "Full Name", value: user.name }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 flex flex-col gap-3 group transition-all duration-500 hover:border-white/10 hover:bg-zinc-900/40"
            >
              <div className="flex items-center gap-3 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                <item.icon size={16} className="text-zinc-700 transition-colors group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-zinc-300 text-lg font-light tracking-tight transition-colors group-hover:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Profile Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            to="/change-password"
            className="w-full md:w-auto min-w-[200px]"
          >
            <button className="w-full flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/5 hover:border-white/20 text-zinc-500 hover:text-white font-bold py-5 px-8 rounded-[2rem] text-[11px] uppercase tracking-widest transition-all cursor-pointer active:scale-98">
              <Settings size={14} /> Change Password
            </button>
          </Link>
          <div className="w-full md:w-auto min-w-[200px]">
             <Link to="/generate-report">
               <LiquidCtaButton className="w-full">
                 New Report
               </LiquidCtaButton>
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
