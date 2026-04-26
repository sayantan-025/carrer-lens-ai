import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useRegister } from "../hooks/use-register";
import { useOAuthError } from "../hooks/use-oauth-error";
import { Skeleton } from "../../../components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, Check, AlertCircle, X } from "lucide-react";

import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading: isAuthChecking } = useAuth();
  const { oauthError, clearOAuthError } = useOAuthError();

  const {
    handleRegister,
    isSubmitting,
    errors,
    formData,
    handleInputChange
  } = useRegister(() => {
    navigate("/verify-otp", { state: { email: formData.email } });
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState({ google: false, github: false });

  useEffect(() => {
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setIsPasswordValid(formData.password.length >= 8);
  }, [formData.password]);

  useEffect(() => {
    setIsNameValid(formData.userName.trim().length > 2);
  }, [formData.userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(e);
  };

  const handleSocialLogin = (provider) => {
    setIsRedirecting(prev => ({ ...prev, [provider]: true }));
    const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
    window.location.href = `${baseUrl}/api/oauth/${provider}`;
  };

  const ValidationCheck = ({ isValid }) => (
    <AnimatePresence>
      {isValid && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
        >
          <div className="bg-white rounded-full p-0.5 shadow-[0_0_10px_white]">
            <span className="sr-only">Valid</span>
            <Check className="size-2.5 text-black stroke-[4px]" aria-hidden="true" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isAuthChecking) {
    return (
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12 px-4 xs:px-6 text-left">
        <div className="hidden lg:flex flex-col gap-10">
          <Skeleton className="h-10 w-10 mb-4 rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-3/4 rounded-2xl" />
            </div>
            <Skeleton className="h-20 w-4/5 rounded-2xl" />
          </div>
        </div>
        <div className="w-full max-w-md bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 lg:p-10 shadow-2xl mx-auto lg:mr-0 relative h-auto min-h-[600px]">
          <Skeleton className="h-12 w-12 mb-8 lg:hidden rounded-xl mx-auto" />
          <div className="space-y-8">
            <Skeleton className="h-10 w-32 rounded-xl mx-auto lg:mx-0" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-8 xs:py-12 px-4 xs:px-6 text-left">
      <motion.div 
        className="hidden lg:flex flex-col gap-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" className="inline-block w-fit group" aria-label="Back to home">
          <Logo className="h-10 w-10 mb-4 transition-transform group-hover:scale-110 duration-500" />
        </Link>
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">
              Join CareerLens AI
            </span>
          </div>
          <h2 className="text-6xl font-display font-bold text-white leading-[1.05] tracking-tighter">
            Create Your <br />
            <span className="text-zinc-500 text-6xl">Account.</span>
          </h2>
          <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-md">
            Start your journey with AI-powered resume analysis and personalized interview prep today.
          </p>
        </div>
        <div className="space-y-4">
          {[
            "AI-Driven Resume Insights",
            "Expert Interview Training",
            "Custom Success Roadmaps"
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-zinc-400 group">
              <CheckCircle2 className="size-4 text-white/20 group-hover:text-white transition-colors" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 lg:p-10 shadow-2xl mx-auto lg:mr-0 relative"
      >
        <div className="text-center lg:text-left mb-8 xs:mb-10">
          <div className="lg:hidden flex justify-center mb-6 xs:mb-8">
            <Logo className="h-10 w-10 xs:h-12 xs:w-12" />
          </div>
          <h1 className="text-2xl xs:text-3xl font-display font-bold text-white mb-2 tracking-tighter">
            Register
          </h1>
          <p className="text-zinc-500 font-bold text-[9px] xs:text-[10px] uppercase tracking-[0.2em]">
            Set up your profile
          </p>
        </div>

        {/* OAuth Error Alert */}
        <AnimatePresence>
          {oauthError && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="relative overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                <AlertCircle className="size-4 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-widest flex-1">
                  {oauthError}
                </p>
                <button
                  onClick={clearOAuthError}
                  className="p-1 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  aria-label="Clear error"
                >
                  <X className="size-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col space-y-3 xs:space-y-4 mb-8 xs:mb-10">
          <button
            onClick={() => handleSocialLogin("github")}
            disabled={isRedirecting.github || isRedirecting.google || isSubmitting}
            className="flex h-11 xs:h-12 w-full items-center justify-center gap-2 xs:gap-3 rounded-xl bg-zinc-900 border border-white/5 px-2 xs:px-4 text-[10px] xs:text-[11px] font-bold uppercase tracking-widest text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white hover:border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with GitHub"
          >
            {isRedirecting.github ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <svg className="size-3.5 xs:size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.181-1.305.289-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.213-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.833 1.233 1.903 1.233 3.213 0 4.61-2.803 5.625-5.475 5.92.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg> 
                GitHub
              </>
            )}
          </button>
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={isRedirecting.github || isRedirecting.google || isSubmitting}
            className="flex h-11 xs:h-12 w-full items-center justify-center gap-2 xs:gap-3 rounded-xl bg-zinc-900 border border-white/5 px-2 xs:px-4 text-[10px] xs:text-[11px] font-bold uppercase tracking-widest text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white hover:border-white/10 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with Google"
          >
            {isRedirecting.google ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <svg className="h-3.5 w-3.5 xs:h-4 xs:w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                </svg>
                Google
              </>
            )}
          </button>
        </div>

        <div className="relative mb-8 xs:mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em]">
            <span className="bg-[#050505] px-4 text-zinc-600 font-bold italic">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 xs:space-y-8 flex flex-col items-center">
          <div className="w-full space-y-2 text-left">
            <Label htmlFor="username" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Full Name</Label>
            <div className="relative">
              <Input 
                id="username" 
                placeholder="Your Name" 
                type="text" 
                autoComplete="name"
                value={formData.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                required
                className={cn(
                  "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800",
                  errors.userName && "border-red-500/50"
                )}
              />
              <ValidationCheck isValid={isNameValid} />
            </div>
            {errors.userName && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                {errors.userName}
              </p>
            )}
          </div>
          
          <div className="w-full space-y-2 text-left">
            <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Email Address</Label>
            <div className="relative">
              <Input 
                id="email" 
                placeholder="name@example.com" 
                type="email" 
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className={cn(
                  "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800",
                  errors.email && "border-red-500/50"
                )}
              />
              <ValidationCheck isValid={isEmailValid} />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="w-full space-y-2 text-left">
            <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className={cn(
                  "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl pr-12 placeholder:text-zinc-800",
                  errors.password && "border-red-500/50"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-700 hover:text-white transition-colors cursor-pointer z-20"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
              <ValidationCheck isValid={isPasswordValid} />
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 animate-in fade-in slide-in-from-top-1">
                {errors.password}
              </p>
            )}
          </div>

          {errors.general && (
            <p className="w-full text-[10px] text-red-500 font-bold uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-1">
              {errors.general}
            </p>
          )}

          <div className="w-full pt-2 flex justify-center">
             <LiquidCtaButton 
                type="submit" 
                className="w-full" 
                loading={isSubmitting}
                loadingText="Creating Account..."
                fullWidth
             >
               Register
             </LiquidCtaButton>
          </div>
        </form>

        <p className="text-center mt-8 xs:mt-10 text-[10px] xs:text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:text-zinc-300 transition-colors font-bold whitespace-nowrap"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
