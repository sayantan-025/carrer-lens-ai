import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useVerifyOTP } from "../hooks/use-verify-otp";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";
import { DotLoader } from "../../../components/ui/dot-loader";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendOTP } = useAuth();
  const email = location.state?.email;

  const {
    handleVerify,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
    setFormData
  } = useVerifyOTP(() => {
    navigate("/");
  });

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }
    setFormData(prev => ({ ...prev, email }));
  }, [email, navigate, setFormData]);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = value.substring(value.length - 1);
    setOtpArray(newOtpArray);
    
    const otpString = newOtpArray.join("");
    handleInputChange("otp", otpString);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (!pasteData.every(char => /^\d+$/.test(char))) return;

    const newOtpArray = [...otpArray];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtpArray[i] = char;
    });
    setOtpArray(newOtpArray);
    
    const otpString = newOtpArray.join("");
    handleInputChange("otp", otpString);
    
    const nextFocus = Math.min(pasteData.length, 5);
    inputRefs.current[nextFocus].focus();
  };

  const onVerify = async (e) => {
    e.preventDefault();
    await handleVerify(e);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await resendOTP({ email });
      setCountdown(60);
    } catch (err) {
      const msg = err.response?.data?.message || "Error resending code.";
      setErrors({ otp: msg });
    }
  };

  const isOtpComplete = formData.otp.length === 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-10 shadow-2xl mx-auto relative"
    >
      <div className="text-center mb-10">
        <div className="flex justify-center mb-8">
          <Logo className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tighter text-center">
          Verify Email
        </h1>
        <p className="text-zinc-500 font-bold text-[9px] xs:text-[10px] uppercase tracking-[0.2em] px-4 leading-relaxed text-center">
          Sent to <span className="text-zinc-100">{email}</span>
        </p>
      </div>

      <form onSubmit={onVerify} className="space-y-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 w-full text-center">
          <Label className="text-center w-full mb-2 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Verification Code</Label>
          <div className="flex justify-between w-full gap-2" onPaste={handlePaste}>
            {otpArray.map((digit, index) => (
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
                    digit ? "border-white/20 ring-1 ring-white/10 shadow-[0_0_15px_white/5]" : "border-white/5 hover:border-white/10 focus:border-white/20",
                    errors.otp && "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                  )}
                />
              </div>
            ))}
          </div>
          {(errors.otp || errors.general) && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
              {errors.otp || errors.general}
            </p>
          )}
        </div>

        <div className="w-full pt-2 flex justify-center">
           <LiquidCtaButton 
             type="submit" 
             disabled={isSubmitting || !isOtpComplete} 
             className="w-full"
             loading={isSubmitting}
             loadingText="Verifying..."
             fullWidth
           >
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
