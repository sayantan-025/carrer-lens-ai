import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/LiquidCtaButton";

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

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
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
    
    const nextFocus = Math.min(pasteData.length, 5);
    inputRefs.current[nextFocus].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");
    
    try {
      await verifyOTP({ email, otp: otpString });
      showToast({ message: "Verification successful.", type: "success" });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code.");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await resendOTP({ email });
      showToast({ message: "New code sent to your email.", type: "info" });
      setCountdown(60);
    } catch (err) {
      showToast({ message: "Failed to resend code.", type: "error" });
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

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
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tighter">
          Verify Email
        </h1>
        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] px-4 leading-relaxed">
          Sent to <span className="text-zinc-100">{email}</span>
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

      <form onSubmit={handleVerify} className="space-y-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 w-full">
          <Label className="text-center w-full mb-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Verification Code</Label>
          <div className="flex justify-between w-full gap-2" onPaste={handlePaste}>
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
                    "w-full h-full text-center bg-zinc-900/30 border rounded-xl text-xl font-bold text-white transition-all duration-300 outline-none",
                    digit ? "border-white/20 ring-1 ring-white/10 shadow-[0_0_15px_white/5]" : "border-white/5 hover:border-white/10 focus:border-white/20"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full pt-2 flex justify-center">
           <LiquidCtaButton type="submit" disabled={isLoading || !isOtpComplete} className="w-full">
             Verify Code
           </LiquidCtaButton>
        </div>
      </form>

      <div className="text-center mt-10">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
          Didn't receive code?
        </p>
        {countdown > 0 ? (
          <p className="text-white/60 text-[11px] mt-2 font-mono tracking-tighter">
            Resend in <span className="text-white font-bold">{countdown}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="mt-3 text-white hover:text-zinc-300 font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 mx-auto cursor-pointer active:scale-95"
          >
            <RefreshCw size={12} /> Resend Code
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyOTP;
