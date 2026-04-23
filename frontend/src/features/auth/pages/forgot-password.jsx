import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronLeft } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { forgotPassword, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword({ email });
      showToast({ message: "Reset OTP sent to your email!", type: "success" });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset OTP. Please try again.");
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
            Recovery Mode
          </h1>
          <p className="text-zinc-500 font-light text-sm">
            Enter your email to receive a reset code.
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
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              placeholder="ops@careerlens.ai" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-12 w-full rounded-xl bg-white font-bold text-black shadow-[0px_1px_0px_0px_rgba(255,255,255,0.1)_inset] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? "Transmitting..." : "Send Reset Code"} <ArrowRight size={18} />
            </span>
            <BottomGradient />
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/login"
            className="text-zinc-500 hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} /> Back to Login
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

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      {children}
    </div>
  );
};

export default ForgotPassword;
