import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../../../context/toast-context";
import FullScreenLoader from "../../../components/ui/full-screen-loader";
import Logo from "../../../components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      showToast({ message: "Welcome back! Successfully logged in.", type: "success" });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/oauth/${provider}`;
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4 bg-black selection:bg-white/20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Side - Value Prop (Hidden on mobile) */}
        <motion.div 
          className="hidden lg:flex flex-col gap-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="inline-block w-fit">
            <Logo size={56} />
          </Link>
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-bold text-white leading-[1.1] tracking-tighter">
              Get back to building your <br />
              <span className="text-zinc-500">dream career.</span>
            </h2>
            <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-md">
              Sign in to access your interview reports, resume analysis, and preparation plans.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "Personalized Interview Reports",
              "ATS-Friendly Resume Builder",
              "Real-time Skill Gap Analysis"
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="size-5 text-white/40" />
                <span className="font-light tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-zinc-900/20 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-3xl mx-auto lg:mr-0 relative group overflow-hidden"
        >
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size={48} />
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tighter">
              Welcome back
            </h1>
            <p className="text-zinc-500 font-light text-sm">
              Enter your credentials to continue the protocol.
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

          <div className="flex flex-col space-y-4 mb-8">
            <button
              onClick={() => handleSocialLogin("github")}
              className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-xl bg-zinc-900 border border-white/10 px-4 font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              <svg className="h-4 w-4 text-zinc-300 group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.181-1.305.289-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.213-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.833 1.233 1.903 1.233 3.213 0 4.61-2.803 5.625-5.475 5.92.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm">
                Continue with GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-xl bg-zinc-900 border border-white/10 px-4 font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                />
              </svg>
              <span className="text-sm">
                Continue with Google
              </span>
              <BottomGradient />
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-black/50 backdrop-blur-md px-4 text-zinc-600 font-mono font-bold tracking-[0.2em]">Or Protocol Alpha</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                placeholder="ops@careerlens.ai" 
                type="email" 
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="password" title="Security Password">Security Password</Label>
                <Link to="/forgot-password" element="span" className="text-xs text-white/60 hover:text-white font-medium transition-colors">
                  Recovery Mode
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              className="group/btn relative block h-12 w-full rounded-xl bg-white font-bold text-black shadow-[0px_1px_0px_0px_rgba(255,255,255,0.1)_inset] active:scale-[0.98] transition-all duration-200"
              type="submit"
            >
              <span className="flex items-center justify-center gap-2">
                Sign in to Dashboard <ArrowRight size={18} />
              </span>
              <BottomGradient />
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-zinc-500 font-light">
            New to Career Lens?{" "}
            <Link
              to="/register"
              className="text-white hover:text-zinc-300 font-bold transition-colors underline underline-offset-4 decoration-white/10"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
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

export default Login;
