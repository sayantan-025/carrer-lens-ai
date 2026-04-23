import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

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
              className="w-full max-w-sm bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-8 shadow-3xl pointer-events-auto relative overflow-hidden backdrop-blur-xl"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <LogOut size={32} className="text-white/80" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tighter">
                  Confirm Log Out
                </h3>
                <p className="text-zinc-400 mb-8 font-light leading-relaxed">
                  Are you sure you want to log out of your account?
                </p>

                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={onConfirm}
                    className="group/btn relative w-full bg-white text-black font-bold py-4 rounded-xl shadow-xl shadow-white/5 transition-all flex items-center justify-center gap-2 active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">Yes, Log Out</span>
                    <BottomGradient />
                  </button>
                  <button
                    onClick={onClose}
                    className="group/btn relative w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-xl border border-white/5 transition-all active:scale-95 overflow-hidden"
                  >
                    <span className="relative z-10">Cancel</span>
                    <BottomGradient />
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

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default LogoutModal;
