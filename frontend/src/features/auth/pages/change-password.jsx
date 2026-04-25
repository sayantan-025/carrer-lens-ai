import React, { useState } from "react";
import { useChangePassword } from "../hooks/use-password-hooks";
import { useToast } from "../../../context/toast-context";
import { Spinner } from "../../../components/ui/spinner";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../components/ui/logo";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { cn } from "../../../lib/utils";
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";

const ChangePassword = () => {
  const { showToast } = useToast();

  const {
    handleChangePassword,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
    setFormData,
    setErrors
  } = useChangePassword(() => {
    showToast({ message: "Password updated successfully.", type: "success" });
    setFormData({ oldPassword: "", newPassword: "" });
    setConfirmPassword("");
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }
    await handleChangePassword(e);
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
          Update Security
        </h1>
        <p className="text-zinc-500 font-bold text-[9px] xs:text-[10px] uppercase tracking-[0.2em] text-center">
          Refresh your authentication protocols
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 xs:space-y-8 flex flex-col items-center">
        <div className="w-full space-y-2 text-left">
          <Label htmlFor="oldPassword" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Current Password</Label>
          <Input 
            id="oldPassword" 
            placeholder="••••••••" 
            type={showPassword ? "text" : "password"}
            value={formData.oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            required
            className={cn(
              "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800",
              errors.oldPassword && "border-red-500/50"
            )}
          />
          {errors.oldPassword && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.oldPassword}
            </p>
          )}
        </div>

        <div className="w-full space-y-2 text-left">
          <Label htmlFor="newPassword" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">New Password</Label>
          <div className="relative">
            <Input 
              id="newPassword" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              required
              minLength={8}
              className={cn(
                "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl pr-12 placeholder:text-zinc-800",
                errors.newPassword && "border-red-500/50"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-700 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.newPassword}
            </p>
          )}
        </div>

        <div className="w-full space-y-2 text-left">
          <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Confirm Protocol</Label>
          <Input 
            id="confirmPassword" 
            placeholder="••••••••" 
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
            }}
            required
            className={cn(
              "h-12 bg-zinc-900/30 border-white/5 focus:border-white/20 transition-all rounded-xl placeholder:text-zinc-800",
              errors.confirmPassword && "border-red-500/50"
            )}
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {errors.general && (
          <p className="w-full text-[10px] text-red-500 font-bold uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-1">
            {errors.general}
          </p>
        )}

        <div className="w-full pt-2 flex justify-center">
           <LiquidCtaButton type="submit" disabled={isSubmitting} className="w-full max-w-[280px]">
             {isSubmitting ? <Spinner size="sm" /> : "Update Password"}
           </LiquidCtaButton>
        </div>
      </form>

      <div className="text-center mt-8 xs:mt-10">
        <Link
          to="/profile"
          className="text-zinc-500 hover:text-white font-bold text-[10px] xs:text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Profile
        </Link>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
