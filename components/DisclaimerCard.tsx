"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DisclaimerCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card rounded-2xl p-6 border-l-4 border-l-yellow-400 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertCircle size={100} />
            </div>
            <h3 className="text-lg font-semibold text-white/90 mb-2 flex items-center gap-2">
                <AlertCircle className="text-yellow-400" size={20} />
                Methodology Notice
            </h3>
            <p className="text-sm text-cyan-100/70 italic leading-relaxed">
                "Note: Pengujian sistem saat ini dilakukan menggunakan data simulasi numerik dan mock-up sensor karena perangkat fisik dalam tahap instalasi. Validasi dilakukan berdasarkan parameter hidrodinamika pesisir selatan Jawa."
            </p>
        </motion.div>
    );
}
