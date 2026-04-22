import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import Logo from "../../../components/ui/logo";

const VerifyOTP = () => {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
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

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await verifyOTP({ email, otp: otpValue });
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 selection:bg-blue-500/30">
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
            Verify Email
          </h1>
          <p className="text-gray-400 font-medium text-sm px-4">
            We've sent a 6-digit verification code to <span className="text-blue-400">{email}</span>
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

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="otp"
              className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
            >
              One-Time Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheck
                  size={18}
                  className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
                />
              </div>
              <input
                type="text"
                id="otp"
                maxLength={6}
                placeholder="123456"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-bold tracking-[0.5em] text-center text-xl"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || otpValue.length !== 6}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold mt-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-900/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? "Verifying..." : "Verify Account"} <ArrowRight size={18} />
            </span>
          </motion.button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 font-medium">
            Didn't receive the code?
          </p>
          {countdown > 0 ? (
            <p className="text-blue-400 text-sm mt-2 font-bold">
              Resend available in {countdown}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="mt-2 text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors flex items-center gap-2 mx-auto"
            >
              <Mail size={14} /> Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

