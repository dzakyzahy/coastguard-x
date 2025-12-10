"use client";

import { AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface WarningBannerProps {
  onClose: () => void;
}

export default function WarningBanner({ onClose }: WarningBannerProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[90%] md:w-auto"
    >
      <div className="flex items-center justify-between gap-6 md:gap-12 p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-red-600 to-red-700 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.5)] border border-red-400/50">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }}
          >
            <AlertTriangle className="text-white" size={40} />
          </motion.div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">TSUNAMI WARNING</h3>
            <p className="text-white/80 text-sm md:text-base">Anomalous wave activity detected. Potential threat imminent.</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-white/70 hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </motion.div>
  );
}
