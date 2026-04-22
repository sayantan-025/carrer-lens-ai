import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronLeft } from "lucide-react";
import Logo from "../../../components/ui/logo";

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
            Forgot Password
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Enter your email to receive a password reset code.
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
            <label
              htmlFor="email"
              className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail
                  size={18}
                  className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
                />
              </div>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-medium"
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
              {isLoading ? "Sending..." : "Send Reset Code"} <ArrowRight size={18} />
            </span>
          </motion.button>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/login"
            className="text-gray-400 hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft size={16} /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
