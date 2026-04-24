import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { Spinner } from "../../../components/ui/spinner";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";

const ResetPassword = () => {
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await resetPassword({ email, otp: otpValue, newPassword });
      showToast({ message: "Password reset successful.", type: "success" });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl mx-auto relative"
    >
      <div className="text-center mb-10">
        <div className="flex justify-center mb-8">
          <Logo className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tighter text-center">
          Reset Password
        </h1>
        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] px-4 leading-relaxed text-center">
          For <span className="text-zinc-100">{email}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-5 bg-red-950/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400 text-[11px] font-bold uppercase tracking-widest"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
        <div className="w-full space-y-2 text-left">
          <Label htmlFor="otp" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Verification Code</Label>
          <Input 
            id="otp" 
            placeholder="XXXXXX" 
            type="text" 
            maxLength={6}
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
            required
            className="h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl text-center tracking-[0.5em] font-bold text-lg placeholder:text-zinc-800"
          />
        </div>

        <div className="w-full space-y-2 text-left">
          <Label htmlFor="newPassword" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">New Password</Label>
          <div className="relative">
            <Input 
              id="newPassword" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl pr-12 placeholder:text-zinc-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-700 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="w-full space-y-2 text-left">
          <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            placeholder="••••••••" 
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800"
          />
        </div>

        <div className="w-full pt-4 flex justify-center">
           <LiquidCtaButton type="submit" disabled={isSubmitting} className="w-full">
             {isSubmitting ? (
               <div className="flex items-center justify-center gap-3">
                 <Spinner size="sm" />
                 <span>Resetting...</span>
               </div>
             ) : "Reset Password"}
           </LiquidCtaButton>
        </div>
      </form>
    </motion.div>
  );
};

export default ResetPassword;
