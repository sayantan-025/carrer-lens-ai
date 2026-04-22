import React from "react";
import { useAuth } from "../hooks/use-auth";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../components/ui/logo";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 selection:bg-blue-500/30">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative group overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <div className="size-24 md:size-32 rounded-full bg-blue-600/20 flex items-center justify-center border-2 border-blue-500/30">
              <User size={48} className="text-blue-400" />
            </div>
            <div className="absolute bottom-1 right-1 size-6 bg-green-500 rounded-full border-4 border-[#030303]" title="Verified" />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white tracking-tight">{user.name}</h1>
            <p className="text-blue-400 font-medium">Career Enthusiast</p>
          </div>

          <Link to="/" className="md:ml-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium bg-white/5 px-4 py-2 rounded-full">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Mail size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Email Address</span>
            </div>
            <p className="text-white font-medium">{user.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Calendar size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Account Status</span>
            </div>
            <p className="text-white font-medium">Verified Account</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Shield size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Role</span>
            </div>
            <p className="text-white font-medium">Job Seeker</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <User size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Username</span>
            </div>
            <p className="text-white font-medium">{user.name}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link 
            to="/change-password"
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl text-center transition-all border border-white/10"
          >
            Change Password
          </Link>
          <Link 
            to="/generate-report"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-center transition-all shadow-xl shadow-blue-900/20"
          >
            Create New Report
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
