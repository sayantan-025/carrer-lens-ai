import React, { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../components/ui/logo";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { changePassword, isLoading } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    try {
      await changePassword({ oldPassword, newPassword });
      showToast({ message: "Password changed successfully!", type: "success" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 selection:bg-blue-500/30 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative group overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size={48} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Security
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Update your account password.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              Current Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 group-focus-within:text-blue-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 group-focus-within:text-blue-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
              Confirm New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 group-focus-within:text-blue-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold mt-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-900/20 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? "Updating..." : "Change Password"} <ArrowRight size={18} />
            </span>
          </motion.button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/profile"
            className="text-gray-400 hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Profile
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;

