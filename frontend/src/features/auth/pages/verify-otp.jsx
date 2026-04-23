import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, ShieldCheck, RefreshCw } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, isLoading } = useAuth();
  const { showToast } = useToast();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }

    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, email, navigate]);

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!pasteData.every(char => /^\d+$/.test(char))) return;

    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    // Focus last filled input or last input
    const nextFocus = Math.min(pasteData.length, 5);
    inputRefs.current[nextFocus].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");
    
    try {
      await verifyOTP({ email, otp: otpString });
      showToast({ message: "Email verified successfully!", type: "success" });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please check the code.");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await resendOTP({ email });
      showToast({ message: "New OTP sent to your email.", type: "info" });
      setCountdown(60);
    } catch (err) {
      showToast({ message: "Failed to resend OTP.", type: "error" });
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

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
            Verify Identity
          </h1>
          <p className="text-zinc-500 font-light text-sm px-4 leading-relaxed">
            Transmission sent to <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-zinc-800 border border-white/5 rounded-2xl flex items-center gap-3 text-zinc-300 text-sm font-medium"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <Label className="text-center w-full mb-2">Security Code</Label>
            <div className="flex justify-between w-full gap-2 md:gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <div key={index} className="relative flex-1 aspect-square max-w-[56px]">
                  <input
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={cn(
                      "w-full h-full text-center bg-zinc-900/50 border rounded-xl text-xl font-bold text-white transition-all duration-300 outline-none",
                      digit ? "border-white/40 ring-1 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "border-white/10 hover:border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/20"
                    )}
                  />
                  {/* Subtle active indicator dot */}
                  {!digit && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-800" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="group/btn relative block h-12 w-full rounded-xl bg-white font-bold text-black shadow-[0px_1px_0px_0px_rgba(255,255,255,0.1)_inset] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            type="submit"
            disabled={isLoading || !isOtpComplete}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <RefreshCw className="size-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Initialize Session <ArrowRight size={18} />
                </>
              )}
            </span>
            <BottomGradient />
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-zinc-500 font-light">
            Protocol timed out?
          </p>
          {countdown > 0 ? (
            <p className="text-white/60 text-xs mt-2 font-mono tracking-tighter">
              Resend available in <span className="text-white font-bold">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="mt-2 text-white hover:text-zinc-300 font-bold text-sm transition-all flex items-center gap-2 mx-auto underline underline-offset-4 decoration-white/10 active:scale-95"
            >
              <Mail size={14} /> Request New OTP
            </button>
          )}
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

export default VerifyOTP;
