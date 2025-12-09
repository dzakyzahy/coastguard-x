import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                ocean: {
                    DEFAULT: "#0f172a", // Deep Ocean
                    light: "#1e293b",
                },
                alert: {
                    DEFAULT: "#ef4444", // Tsunami Warning
                },
                safe: {
                    DEFAULT: "#10b981", // Evacuation Routes
                },
                data: {
                    DEFAULT: "#3b82f6", // Sensor Graphs
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
};
export default config;
