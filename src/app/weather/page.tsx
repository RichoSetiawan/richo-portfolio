"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CloudSun, Droplets, Thermometer, Wind, MapPin, ArrowLeft, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

const weatherCharacters: Record<string, { emoji: string; animation: string; bg: string }> = {
  Clear: { emoji: "😎", animation: "animate-bounce", bg: "from-amber-500/20 to-orange-500/20" },
  Clouds: { emoji: "🤔", animation: "animate-pulse", bg: "from-gray-500/20 to-slate-500/20" },
  Rain: { emoji: "🏃", animation: "animate-bounce", bg: "from-blue-500/20 to-cyan-500/20" },
  Drizzle: { emoji: "☔", animation: "animate-pulse", bg: "from-blue-400/20 to-sky-400/20" },
  Thunderstorm: { emoji: "😱", animation: "animate-ping", bg: "from-purple-500/20 to-indigo-500/20" },
  Snow: { emoji: "⛷️", animation: "animate-bounce", bg: "from-blue-200/20 to-white/20" },
  Mist: { emoji: "🌫️", animation: "animate-pulse", bg: "from-gray-400/20 to-gray-300/20" },
  Haze: { emoji: "🌫️", animation: "animate-pulse", bg: "from-yellow-500/20 to-amber-400/20" },
};

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(); }, []);

  const character = weather ? weatherCharacters[weather.condition] ?? weatherCharacters.Clear : weatherCharacters.Clear;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container max-w-lg">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <Link
          href="/"
          aria-label="Back to Home"
          title="Back to Home"
          className="fixed bottom-6 right-6 md:bottom-7 md:right-7 lg:bottom-8 lg:right-8 z-50 w-14 h-14 md:w-[60px] md:h-[60px] lg:w-16 lg:h-16 rounded-full bg-primary-accent text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-primary-accent/40 active:scale-95 transition-all duration-300 group"
        >
          <Home size={24} className="group-hover:-rotate-12 transition-transform" />
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <CloudSun size={28} className="text-primary-accent" />
          <h1 className="text-3xl font-bold gradient-text">Weather App</h1>
        </div>
        <p className="text-text-secondary mb-8 text-sm">Real-time weather with animated characters</p>

        <div className={`rounded-2xl bg-gradient-to-br ${character.bg} border border-border-subtle overflow-hidden`}>
          {loading ? (
            <div className="p-12 text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <RefreshCw size={32} className="text-primary-accent mx-auto" />
              </motion.div>
              <p className="text-sm text-text-secondary mt-4">Fetching weather data...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-4xl mb-4">😵</p>
              <p className="text-sm text-red-400 mb-4">{error}</p>
              <p className="text-xs text-text-secondary mb-4">Make sure OPENWEATHER_API_KEY is set in .env</p>
              <button onClick={fetchWeather} className="px-4 py-2 rounded-lg bg-primary-accent/15 text-primary-accent text-sm hover:bg-primary-accent/25 transition-colors">
                Try Again
              </button>
            </div>
          ) : weather ? (
            <div className="p-8">
              {/* Location */}
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-6">
                <MapPin size={14} />
                <span>{weather.location}</span>
                <button onClick={fetchWeather} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <RefreshCw size={14} className="text-text-secondary" />
                </button>
              </div>

              {/* Character & Temp */}
              <div className="flex items-center gap-6 mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-7xl"
                >
                  <span className={character.animation}>{character.emoji}</span>
                </motion.div>
                <div>
                  <p className="text-5xl font-bold text-text-primary">{weather.temp}°C</p>
                  <p className="text-sm text-text-secondary capitalize mt-1">{weather.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <Thermometer size={16} className="text-primary-accent mx-auto mb-1" />
                  <p className="text-sm font-medium text-text-primary">{weather.feels_like}°C</p>
                  <p className="text-[10px] text-text-secondary">Feels like</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <Droplets size={16} className="text-blue-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-text-primary">{weather.humidity}%</p>
                  <p className="text-[10px] text-text-secondary">Humidity</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <Wind size={16} className="text-teal-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-text-primary">{weather.condition}</p>
                  <p className="text-[10px] text-text-secondary">Condition</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
