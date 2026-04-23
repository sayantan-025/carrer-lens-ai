import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";

const ResetPassword = () => {
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { resetPassword, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    try {
      await resetPassword({ email, otp: otpValue, newPassword });
      showToast({ message: "Password reset successful! Please login.", type: "success" });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Please check the code.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 bg-black selection:bg-white/20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-zinc-900/20 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-3xl mx-auto relative group overflow-hidden"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size={48} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tighter">
            Reset Protocol
          </h1>
          <p className="text-zinc-500 font-light text-sm px-4 leading-relaxed">
            Enter the security code sent to <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-zinc-800 border border-white/5 rounded-2xl flex items-center gap-3 text-zinc-300 text-sm font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <LabelInputContainer>
            <Label htmlFor="otp">Security Code</Label>
            <Input 
              id="otp" 
              placeholder="123456" 
              type="text" 
              maxLength={6}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
              required
              className="text-center tracking-[0.5em] font-bold text-lg"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="newPassword">New Security Password</Label>
            <div className="relative">
              <Input 
                id="newPassword" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-12 w-full rounded-xl bg-white font-bold text-black shadow-[0px_1px_0px_0px_rgba(255,255,255,0.1)_inset] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? "Resetting..." : "Update Password"} <ArrowRight size={18} />
            </span>
            <BottomGradient />
          </button>
        </form>
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

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      {children}
    </div>
  );
};

export default ResetPassword;
