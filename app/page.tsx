"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Activity, Map, ShieldAlert } from "lucide-react";
import SensorChart from "../components/SensorChart";
import EvacuationPanel from "../components/EvacuationPanel";
import DisclaimerCard from "../components/DisclaimerCard";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800/50 animate-pulse rounded-3xl" />,
});

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-cyan-500/30">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* HERO SECTION */}
      <motion.section
        className="h-screen flex flex-col items-center justify-center relative px-6"
        style={{ opacity, scale }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-900/10 backdrop-blur-md text-cyan-300 text-sm font-medium tracking-wide">
              National Scientific Paper Competition Prototype
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 mb-4 drop-shadow-lg">
              COASTGUARD-X
            </h1>
            <p className="text-xl md:text-2xl text-slate-300/80 font-light tracking-wide max-w-2xl mx-auto">
              Integrasi Digital Twin Pesisir & Sensor Gelombang Mini
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold text-lg flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Lihat Dashboard <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-white backdrop-blur-sm">
              Pelajari Metodologi
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-slate-500" size={32} />
        </motion.div>
      </motion.section>

      {/* DASHBOARD SECTION */}
      <section className="min-h-screen px-4 md:px-8 py-12 relative z-10 pt-20">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-2">Live Monitoring Center</h2>
              <p className="text-slate-400">Real-time surveillance of Southern Java Coastal Areas</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                System Status: MONITORING
              </div>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* 1. Methodology Disclaimer (Wide Top) */}
            <div className="md:col-span-12 lg:col-span-4 lg:row-span-1">
              <DisclaimerCard />
            </div>

            {/* 2. Sensor Chart (Large) */}
            <div className="md:col-span-12 lg:col-span-8 lg:row-span-2">
              <SensorChart />
            </div>

            {/* 3. Evacuation Panel (Side) */}
            <div className="md:col-span-12 lg:col-span-4 lg:row-span-3">
              <EvacuationPanel />
            </div>

            {/* 4. Map (Extra Large) */}
            <div className="md:col-span-12 lg:col-span-8 lg:row-span-2 min-h-[500px]">
              <div className="h-full w-full glass-card rounded-3xl p-1 overflow-hidden relative group">
                <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-white/80 text-sm font-medium flex items-center gap-2">
                  <Map size={16} className="text-cyan-400" />
                  Digital Twin Interface
                </div>
                <MapComponent />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 mt-20 text-center text-slate-500 text-sm">
        <p>© 2025 COASTGUARD-X Project. National Scientific Paper Competition Prototype.</p>
        <p className="mt-2 text-xs opacity-50">Developed with Next.js & Framer Motion.</p>
      </footer>
    </main>
  );
}
