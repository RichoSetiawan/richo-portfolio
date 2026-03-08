import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  let coordinates = { lat: lat || "-6.2088", lon: lon || "106.8456" }; // Default: Jakarta

  // IP geolocation fallback
  if (!lat || !lon) {
    try {
      const ipRes = await fetch("http://ip-api.com/json/", { cache: "no-store" });
      const ipData = await ipRes.json();
      if (ipData.status === "success") {
        coordinates = { lat: ipData.lat.toString(), lon: ipData.lon.toString() };
      }
    } catch {
      // Use Jakarta default
    }
  }

  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "your_api_key_here") {
    return NextResponse.json({ error: "OpenWeatherMap API key not configured" }, { status: 500 });
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error("Weather API error");
    const data = await res.json();

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      location: data.name,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
