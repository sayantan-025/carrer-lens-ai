import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 32, className = "" }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-blue-500"
      >
        {/* Outer Tech Shell (The Lens) */}
        <motion.path 
          d="M3 20C3 10.611 10.611 3 20 3C29.389 3 37 10.611 37 20C37 29.389 29.389 37 20 37C10.611 37 3 29.389 3 20Z" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* The 'C' curve (Career) */}
        <motion.path 
          d="M26 14C23.6 11.2 19.8 11.2 15.5 14C11.2 16.8 11.2 23.2 15.5 26" 
          stroke="#E0F2FE" 
          strokeWidth="4" 
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        {/* The 'L' Ascending Arrow (Lens / Growth) */}
        <motion.path 
          d="M18 20L25 27L29 17" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        />
        
        {/* Tech Nodes */}
        <circle cx="29" cy="17" r="2" fill="#E0F2FE" />
        <circle cx="25" cy="27" r="2" fill="#E0F2FE" />
      </svg>
    </motion.div>
  );
};

export default Logo;
