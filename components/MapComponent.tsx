"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, LayersControl, LayerGroup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import clsx from "clsx";

// Fix Leaflet Default Icon
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl, iconRetinaUrl, shadowUrl,
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


function InundationZone({ center, isWarningActive }: { center: [number, number], isWarningActive: boolean }) {
    const map = useMap();
    const [radius, setRadius] = useState(40);
  
    useEffect(() => {
        if (isWarningActive) {
            let start = Date.now();
            const pulse = () => {
                let elapsed = Date.now() - start;
                let progress = (elapsed % 1500) / 1500; // 1.5 second pulse
                let newRadius = 40 + 20 * Math.sin(progress * Math.PI);
                setRadius(newRadius);
                if (map) { // check if map exists
                    requestAnimationFrame(pulse);
                }
            };
            pulse();
        } else {
            setRadius(40);
        }
    }, [isWarningActive, map]);
  
    return (
      <CircleMarker
        center={center}
        radius={radius}
        pathOptions={{
            color: 'transparent',
            fillColor: isWarningActive ? '#ef4444' : '#f97316',
            fillOpacity: isWarningActive ? 0.5 : 0.3,
        }}
      />
    );
  }

export default function MapComponent({ isWarningActive }: { isWarningActive: boolean }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-slate-800 animate-pulse rounded-3xl flex items-center justify-center text-slate-500">Loading Map...</div>;

    const center: [number, number] = [-7.7, 109.0];

    const evacuationRoute: [number, number][] = [
        [-7.71, 109.01], [-7.70, 109.015], [-7.69, 109.02], [-7.68, 109.025]
    ];
    
    const safestEvacuationRoute: [number, number][] = [
        [-7.71, 109.01], [-7.705, 109.005], [-7.695, 109.01], [-7.68, 109.00]
    ];

    const inundationZones: [number, number][] = [
        [-7.72, 109.0], [-7.72, 109.05], [-7.72, 108.95],
    ];

    const routeToShow = isWarningActive ? safestEvacuationRoute : evacuationRoute;

    return (
        <div className={clsx(
            "w-full h-full rounded-3xl overflow-hidden shadow-2xl relative z-0 transition-all",
            isWarningActive ? "ring-4 ring-red-500 ring-offset-4 ring-offset-slate-900 animate-pulse" : "border border-white/10"
        )}>
            <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%", background: "#0f172a" }}
                className="z-0"
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Dark Matter">
                        <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer attribution='&copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay checked name="Evacuation Route">
                        <LayerGroup>
                            <Polyline positions={routeToShow} pathOptions={{ color: isWarningActive ? '#10b981' : '#fb923c', weight: 5, dashArray: isWarningActive ? undefined : '10, 10' }} />
                            <CircleMarker center={routeToShow[routeToShow.length - 1]} radius={8} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 1 }}>
                                <Popup>Safe Zone (Elevation &gt; 12m)</Popup>
                            </CircleMarker>
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Inundation Zones">
                        <LayerGroup>
                            {inundationZones.map((pos, idx) => (
                                <InundationZone key={idx} center={pos} isWarningActive={isWarningActive} />
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Sensors">
                        <LayerGroup>
                            <CircleMarker center={[-7.72, 109.02]} radius={6} pathOptions={{ color: isWarningActive ? '#ef4444' : '#3b82f6', fillColor: isWarningActive ? '#ef4444' : '#3b82f6', fillOpacity: 0.8 }}>
                                <Popup>Sensor Node 01 - {isWarningActive ? "HIGH ALERT" : "Active"}</Popup>
                            </CircleMarker>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>

            <div className="absolute bottom-4 left-4 z-[500] pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs text-slate-300 border border-white/5">
                    Southern Java Digital Twin
                </div>
            </div>
        </div>
    );
}
