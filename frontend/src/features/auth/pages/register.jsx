import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import FullScreenLoader from "../../../components/ui/full-screen-loader";
import Logo from "../../../components/ui/logo";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, register } = useAuth();
  const { showToast } = useToast();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await register({ userName, email, password });
      showToast({ 
        message: response.message || "Account created successfully!", 
        type: "success" 
      });
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/oauth/${provider}`;
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 selection:bg-blue-500/30">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Side - Value Prop */}
        <motion.div 
          className="hidden lg:flex flex-col gap-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-block w-fit">
            <Logo size={56} />
          </Link>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Start your journey to a <span className="text-blue-400">better career</span>.
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Create an account to unlock personalized AI insights and professional resumes.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "Free AI Resume Analysis",
              "Custom Interview Question Bank",
              "ATS-Friendly Export Options",
              "Lifetime Career Roadmap"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="size-5 text-blue-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl mx-auto lg:mr-0 relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              Join CareerLens to transform your job search.
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

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-2xl transition-all"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="size-5" alt="Google" />
              <span className="text-white text-sm font-semibold">Google</span>
            </button>
            <button 
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-2xl transition-all"
            >
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="size-5 invert" alt="GitHub" />
              <span className="text-white text-sm font-semibold">GitHub</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#030303] px-4 text-gray-500 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    size={18}
                    className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="John Doe"
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-medium"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    size={18}
                    className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-medium tracking-widest"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 pl-1 mt-1 font-medium">
                Must be at least 8 characters long
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold mt-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group/btn shadow-xl shadow-blue-900/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Free Account <ArrowRight size={18} />
              </span>
            </motion.button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-400 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
