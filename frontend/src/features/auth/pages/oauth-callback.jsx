import React from "react";
import useOAuthCallback from "../hooks/use-oauth-callback";
import { DotLoader } from "../../../components/ui/dot-loader";
import { motion } from "framer-motion";
import Logo from "../../../components/ui/logo";

const OAuthCallback = () => {
  useOAuthCallback();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <Logo className="size-16 animate-pulse" />
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-bold text-white tracking-tighter uppercase">
            Securing Session
          </h1>
          <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            Establishing neural handshake...
          </p>
        </div>
        <DotLoader className="scale-150" />
      </motion.div>
    </div>
  );
};

export default OAuthCallback;
