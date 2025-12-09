"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Fix Leaflet Default Icon issue in Next.js
import L from "leaflet";
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-slate-800 animate-pulse rounded-3xl flex items-center justify-center text-slate-500">Loading Map...</div>;

    const center: [number, number] = [-7.7, 109.0]; // Southern Java approx (Cilacap/Kebumen area)

    // Simulation Data
    const evacuationRoute: [number, number][] = [
        [-7.71, 109.01],
        [-7.70, 109.015],
        [-7.69, 109.02],
        [-7.68, 109.025]
    ];

    const inundationZones: [number, number][] = [
        [-7.72, 109.0],
        [-7.72, 109.05],
        [-7.72, 108.95],
    ];

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
            <MapContainer
                center={center}
                zoom={12}
                style={{ height: "100%", width: "100%", background: "#0f172a" }}
                className="z-0"
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Dark Matter">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer
                            attribution='&copy; Esri'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay checked name="Evacuation Routes">
                        <LayerGroup>
                            <Polyline positions={evacuationRoute} pathOptions={{ color: '#10b981', weight: 4, dashArray: '10, 10' }} />
                            <CircleMarker center={evacuationRoute[evacuationRoute.length - 1]} radius={8} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 1 }}>
                                <Popup>Safe Zone (Hill Top)</Popup>
                            </CircleMarker>
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Inundation Zones">
                        <LayerGroup>
                            {inundationZones.map((pos, idx) => (
                                <CircleMarker key={idx} center={pos} radius={40} pathOptions={{ color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.3 }} />
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Sensors">
                        <LayerGroup>
                            <CircleMarker center={[-7.72, 109.02]} radius={6} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.8 }}>
                                <Popup>Sensor Node 01 - Active</Popup>
                            </CircleMarker>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>

            {/* Overlay UI elements can go here */}
            <div className="absolute bottom-4 left-4 z-[500] pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs text-slate-300 border border-white/5">
                    Southern Java Digital Twin
                </div>
            </div>
        </div>
    );
}
