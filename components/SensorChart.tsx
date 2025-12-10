"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, WifiOff } from "lucide-react";
import clsx from "clsx";

type DataPoint = {
    time: string;
    height: number;
};

type SystemStatus = "MONITORING" | "WARNING" | "MAINTENANCE";

export default function SensorChart({ systemStatus }: { systemStatus: SystemStatus }) {
    const [data, setData] = useState<DataPoint[]>([]);
    const [isOnline, setIsOnline] = useState(true);

    const isWarning = systemStatus === 'WARNING';

    useEffect(() => {
        const initialData: DataPoint[] = [];
        for (let i = 0; i < 20; i++) {
            initialData.push({ time: i.toString(), height: 0.5 });
        }
        setData(initialData);

        const dataInterval = setInterval(() => {
            if (!isOnline) return;

            setData((prev) => {
                const now = new Date();
                const timeLabel = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

                const time = Date.now() / 1000;
                let baseHeight = 0.55;
                let noise = (Math.random() - 0.5) * 0.2;
                let osc = Math.sin(time * (isWarning ? 4 : 2)) * (isWarning ? 0.4 : 0.3); // Increase frequency and amplitude on warning
                let newHeight = baseHeight + osc + noise;
                
                if (isWarning) {
                    newHeight += 0.2 * Math.sin(time * 10); // Add high frequency noise during warning
                }

                if (newHeight < 0.1) newHeight = 0.1;
                if (newHeight > (isWarning ? 1.5 : 1.0)) newHeight = (isWarning ? 1.5 : 1.0);

                const newItem = {
                    time: timeLabel,
                    height: parseFloat(newHeight.toFixed(2)),
                };

                const newData = [...prev, newItem];
                if (newData.length > 30) newData.shift();
                return newData;
            });
        }, 500);

        const connectionInterval = setInterval(() => {
            setIsOnline(prev => Math.random() > 0.1 ? true : !prev); // 10% chance to toggle
        }, 8000);

        return () => {
            clearInterval(dataInterval);
            clearInterval(connectionInterval);
        };
    }, [isOnline, isWarning]);

    const chartColor = isWarning ? "#ef4444" : "#3b82f6";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, borderColor: isWarning ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.05)' }}
            className="glass-card rounded-3xl p-6 w-full h-[350px] flex flex-col border transition-colors"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className={clsx("text-xl font-semibold flex items-center gap-2 transition-colors", isWarning ? "text-red-400" : "text-white")}>
                        <Activity className={isWarning ? "text-red-400" : "text-data"} />
                        Live Wave Sensor
                    </h3>
                    <p className="text-xs text-slate-400">Mini Wave Sensor Network (Simulated)</p>
                </div>
                <AnimatePresence mode="wait">
                    {isOnline ? (
                         <motion.div
                            key="online"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            className="flex items-center gap-2"
                        >
                            <div className={clsx("w-2 h-2 rounded-full animate-pulse", isWarning ? "bg-red-500" : "bg-green-500")}></div>
                            <span className={clsx("text-xs font-mono", isWarning ? "text-red-400" : "text-green-400")}>{isWarning ? "HIGH ALERT" : "ONLINE"}</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="offline"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                            <span className="text-xs text-slate-500 font-mono">SIGNAL LOST</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                <AnimatePresence>
                    {!isOnline && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-b-2xl"
                        >
                            <WifiOff className="text-red-500 mb-4" size={48} />
                            <h4 className="text-xl font-bold text-red-400">Connection Interrupted</h4>
                            <p className="text-slate-400 text-sm">Attempting to reconnect...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10 }} interval={4} />
                        <YAxis domain={isWarning ? [0, 2.0] : [0, 1.2]} stroke="#475569" tick={{ fontSize: 10 }} label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '12px' }}
                            itemStyle={{ color: chartColor }}
                        />
                        <Area
                            type="monotone"
                            dataKey="height"
                            stroke={chartColor}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#chartGradient)"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
