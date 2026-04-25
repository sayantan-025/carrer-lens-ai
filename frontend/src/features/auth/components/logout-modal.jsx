import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { LiquidCtaButton } from "../../../components/buttons/liquid-cta-button";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-10 shadow-3xl pointer-events-auto relative overflow-hidden backdrop-blur-xl"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                  <LogOut size={32} className="text-zinc-500" />
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-tighter">
                  Sign Out
                </h3>
                <p className="text-zinc-500 mb-10 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Are you sure you want to exit?
                </p>

                <div className="flex flex-col w-full gap-4 items-center">
                  <LiquidCtaButton 
                    onClick={onConfirm}
                    className="w-full max-w-[240px]"
                  >
                    Logout
                  </LiquidCtaButton>
                  
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer py-2 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
