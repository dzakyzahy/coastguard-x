"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Activity, Map, ShieldAlert, Zap, Atom, Users } from "lucide-react";
import SensorChart from "../components/SensorChart";
import EvacuationPanel from "../components/EvacuationPanel";
import DisclaimerCard from "../components/DisclaimerCard";
import WarningBanner from "../components/WarningBanner";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800/50 animate-pulse rounded-3xl" />,
});

type SystemStatus = "MONITORING" | "WARNING" | "MAINTENANCE";

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [systemStatus, setSystemStatus] = useState<SystemStatus>("MONITORING");

  // Simulate a tsunami warning for the demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemStatus("WARNING");
    }, 15000); // Trigger warning after 15 seconds
    return () => clearTimeout(timer);
  }, []);

  const ApproachCard = ({ icon, title, children }: any) => (
    <div className="glass-card rounded-3xl p-8 border border-white/5 hover:border-cyan-400/20 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-slate-400 leading-relaxed">{children}</p>
    </div>
  );

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-cyan-500/30">

      <AnimatePresence>
        {systemStatus === "WARNING" && (
          <WarningBanner onClose={() => setSystemStatus("MONITORING")} />
        )}
      </AnimatePresence>

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
              UII Siaga Awards 2025 Prototype
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 mb-4 drop-shadow-lg">
              COASTGUARD-X
            </h1>
            <p className="text-xl md:text-2xl text-slate-300/80 font-light tracking-wide max-w-2xl mx-auto">
              A Tsunami Mitigation System integrating a Mini Wave Sensor, WebGIS Digital Twin, and Communal Evacuation Simulation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <a href="#dashboard" className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold text-lg flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Lihat Dashboard <ArrowRight size={20} />
            </a>
            <a href="#approach" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-white backdrop-blur-sm">
              Pelajari Metodologi
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10"
        >
          <a href="#dashboard"><ChevronDown className="text-slate-500" size={32} /></a>
        </motion.div>
      </motion.section>

      {/* DASHBOARD SECTION */}
      <section id="dashboard" className="min-h-screen px-4 md:px-8 py-12 relative z-10 pt-20">
        <div className="max-w-[1600px] mx-auto space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-2">Live Monitoring Center</h2>
              <p className="text-slate-400">Real-time surveillance of Southern Java Coastal Areas</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all
                ${systemStatus === 'WARNING'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse'
                  : 'bg-green-500/10 border border-green-500/20 text-green-400'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${systemStatus === 'WARNING' ? 'bg-red-500' : 'bg-green-500'}`} />
                System Status: {systemStatus}
              </div>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            <div className="md:col-span-12 lg:col-span-4 lg:row-span-1">
              <DisclaimerCard />
            </div>
            <div className="md:col-span-12 lg:col-span-8 lg:row-span-2">
              <SensorChart systemStatus={systemStatus} />
            </div>
            <div className="md:col-span-12 lg:col-span-4 lg:row-span-3">
              <EvacuationPanel isWarningActive={systemStatus === "WARNING"} />
            </div>
            <div className="md:col-span-12 lg:col-span-8 lg:row-span-2 min-h-[500px]">
              <div className="h-full w-full glass-card rounded-3xl p-1 overflow-hidden relative group">
                <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-white/80 text-sm font-medium flex items-center gap-2">
                  <Map size={16} className="text-cyan-400" />
                  Digital Twin Interface
                </div>
                <MapComponent isWarningActive={systemStatus === "WARNING"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section id="approach" className="px-4 md:px-8 py-20 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Science-Technology-Social Integration</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">Our methodology is a synthesis of rigorous scientific principles, modern technological implementation, and a focus on community impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ApproachCard icon={<Atom size={28} className="text-cyan-400" />} title="Science">
              Utilizes **Green's Law** to model tsunami wave amplification in coastal areas. By integrating real-time bathymetry and sensor data, we can accurately predict inundation zones, forming the scientific backbone of our mitigation strategy.
            </ApproachCard>
            <ApproachCard icon={<Zap size={28} className="text-green-400" />} title="Technology">
              A **Digital Twin** powered by WebGIS visualizes complex data in an intuitive interface. The system processes real-time inputs from our **Mini Wave Sensors** and computes optimal evacuation routes using pathfinding algorithms like **Dijkstra's**.
            </ApproachCard>
            <ApproachCard icon={<Users size={28} className="text-amber-400" />} title="Social">
              The ultimate goal is community resilience. By providing clear, actionable **"Fastest" and "Safest" evacuation routes**, and enabling **educational simulations**, we empower communities to prepare for and respond to tsunami threats effectively.
            </ApproachCard>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 mt-20 text-center text-slate-500 text-sm">
        <p>© 2025 COASTGUARD-X Project. UII Siaga Awards Prototype.</p>
        <p className="mt-2 text-xs opacity-50">Developed with Next.js, Leaflet, Recharts, & Framer Motion.</p>
      </footer>
    </main>
  );
}
