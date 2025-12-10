"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonStanding, Timer, TrendingDown, CheckCircle2, ShieldAlert } from "lucide-react";
import clsx from "clsx";

export default function EvacuationPanel({ isWarningActive }: { isWarningActive: boolean }) {
    const [selectedRoute, setSelectedRoute] = useState<'fastest' | 'safest'>('fastest');

    useEffect(() => {
        if (isWarningActive) {
            setSelectedRoute('safest');
        }
    }, [isWarningActive]);

    return (
        <motion.div
            className="glass-card rounded-3xl p-6 flex flex-col h-full border border-white/5 transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, borderColor: isWarningActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.05)' }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <PersonStanding className={isWarningActive ? "text-red-400" : "text-safe"} />
                Evacuation Simulation
            </h3>

            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/5">
                <button
                    onClick={() => setSelectedRoute('fastest')}
                    disabled={isWarningActive}
                    className={clsx(
                        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                        selectedRoute === 'fastest'
                            ? "bg-white/10 text-white shadow-lg border border-white/10"
                            : "text-slate-400 hover:text-white hover:bg-white/5",
                        isWarningActive && "opacity-50 cursor-not-allowed"
                    )}
                >
                    Rute Tercepat
                </button>
                <button
                    onClick={() => setSelectedRoute('safest')}
                    className={clsx(
                        "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                        selectedRoute === 'safest'
                            ? "bg-safe/20 text-safe shadow-lg border border-safe/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                >
                    Rute Teraman
                </button>
            </div>

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    {selectedRoute === 'fastest' ? (
                        <motion.div
                            key="fastest"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <ResultCard
                                label="Risk Analysis"
                                value="Medium Risk"
                                color="text-yellow-400"
                                icon={<TrendingDown size={18} />}
                                desc="Low elevation points detected along the path."
                            />
                            <ResultCard
                                label="Estimated Time"
                                value="9 Minutes"
                                color="text-white"
                                icon={<Timer size={18} />}
                                desc="Fastest path assuming no congestion."
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="safest"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <ResultCard
                                label="Risk Analysis"
                                value="Low Risk"
                                color="text-safe"
                                icon={<CheckCircle2 size={18} />}
                                desc="Route avoids potential inundation zones (>12m)."
                            />
                            <ResultCard
                                label="Estimated Time"
                                value="11 Minutes"
                                color="text-white"
                                icon={<Timer size={18} />}
                                desc="+2 mins detour to reach higher ground."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
                <motion.button 
                    className={clsx(
                        "w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all active:scale-[0.98]",
                        isWarningActive
                          ? "bg-gradient-to-r from-red-600 to-amber-500 shadow-red-500/40 hover:shadow-red-500/60"
                          : "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-500/25 hover:shadow-blue-500/40"
                    )}
                    animate={{
                        scale: isWarningActive ? [1, 1.03, 1] : 1,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {isWarningActive ? "START EVACUATION" : "Start Simulation"}
                </motion.button>
            </div>
        </motion.div>
    );
}

function ResultCard({ label, value, color, icon, desc }: any) {
    return (
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
                <span className={clsx(color)}>{icon}</span>
            </div>
            <div className={clsx("text-2xl font-bold mb-1", color)}>{value}</div>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
    )
}
