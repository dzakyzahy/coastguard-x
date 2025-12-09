"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

type DataPoint = {
    time: string;
    height: number;
};

export default function SensorChart() {
    const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        // Fill initial data
        const initialData: DataPoint[] = [];
        for (let i = 0; i < 20; i++) {
            initialData.push({ time: i.toString(), height: 0.5 });
        }
        setData(initialData);

        const interval = setInterval(() => {
            setData((prev) => {
                const now = new Date();
                const timeLabel = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

                // Simulating wave height 0.1cm - 1.0cm with random oscillation
                // Using sine wave + noise for more realistic look
                const time = Date.now() / 1000;
                const baseHeight = 0.55; // 0.55m average (simulated cm scale converted to logic)
                // 0.1 to 1.0 range
                const noise = (Math.random() - 0.5) * 0.2;
                const osc = Math.sin(time * 2) * 0.3; // frequency approx 0.3Hz
                let newHeight = baseHeight + osc + noise;

                // Clamp
                if (newHeight < 0.1) newHeight = 0.1;
                if (newHeight > 1.0) newHeight = 1.0;

                const newItem = {
                    time: timeLabel,
                    height: parseFloat(newHeight.toFixed(2)),
                };

                const newData = [...prev, newItem];
                if (newData.length > 30) newData.shift(); // Keep last 30 points
                return newData;
            });
        }, 500); // Update every 500ms

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-6 w-full h-[350px] flex flex-col"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Activity className="text-data" />
                        Live Wave Sensor
                    </h3>
                    <p className="text-xs text-slate-400">Mini Wave Sensor Network (Simulated)</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-400 font-mono">ONLINE</span>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            stroke="#475569"
                            tick={{ fontSize: 10 }}
                            interval={4}
                        />
                        <YAxis
                            domain={[0, 1.2]}
                            stroke="#475569"
                            tick={{ fontSize: 10 }}
                            label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '12px' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="height"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorHeight)"
                            isAnimationActive={false} // Disable internal animation for smooth real-time updates
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
