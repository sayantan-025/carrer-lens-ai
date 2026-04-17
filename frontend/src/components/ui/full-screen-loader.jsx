import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const FullScreenLoader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-dark fixed inset-0 z-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={48} className="text-brand-neon" />
      </motion.div>
    </div>
  );
};

export default FullScreenLoader;
