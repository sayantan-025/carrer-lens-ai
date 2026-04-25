import React from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useForgotPassword } from "../hooks/use-password-hooks";
import { useToast } from "../../../context/toast-context";
import { Spinner } from "../../../components/ui/spinner";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    handleForgotPassword,
    isSubmitting,
    errors,
    formData,
    handleInputChange
  } = useForgotPassword(() => {
    showToast({ message: "Code sent.", type: "success" });
    navigate("/reset-password", { state: { email: formData.email } });
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleForgotPassword(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] xs:rounded-[2.5rem] p-6 xs:p-8 lg:p-10 shadow-2xl mx-auto relative"
    >
      <div className="text-center mb-8 xs:mb-10">
        <div className="flex justify-center mb-6 xs:mb-8">
          <Logo className="h-10 w-10 xs:h-12 xs:w-12" />
        </div>
        <h1 className="text-2xl xs:text-3xl font-display font-bold text-white mb-2 tracking-tighter text-center">
          Forgot Password
        </h1>
        <p className="text-zinc-500 font-bold text-[9px] xs:text-[10px] uppercase tracking-[0.2em] px-4 leading-relaxed text-center">
          Enter your email to reset
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 xs:space-y-8 flex flex-col items-center">
        <div className="w-full space-y-2 text-left">
          <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Email Address</Label>
          <Input 
            id="email" 
            placeholder="name@example.com" 
            type="email" 
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className={cn(
              "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800",
              errors.email && "border-red-500/50"
            )}
          />
          {(errors.email || errors.general) && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.email || errors.general}
            </p>
          )}
        </div>

        <div className="w-full pt-2 flex justify-center">
           <LiquidCtaButton type="submit" disabled={isSubmitting} className="w-full max-w-[280px]">
             {isSubmitting ? (
               <div className="flex items-center justify-center gap-3">
                 <Spinner size="sm" />
                 <span>Sending...</span>
               </div>
             ) : "Send Reset Link"}
           </LiquidCtaButton>
        </div>
      </form>

      <div className="text-center mt-8 xs:mt-10">
        <Link
          to="/login"
          className="text-zinc-500 hover:text-white font-bold text-[10px] xs:text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
