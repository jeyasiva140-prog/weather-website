import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function localTime(unix, offset) {
  return new Date((unix + offset) * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", timeZone: "UTC"
  });
}

export default function WeatherPanel({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      if (!API_KEY || API_KEY === "your_api_key_here") {
        setWeather(null);
        setError("Add your free OpenWeather API key in the .env file to load live weather.");
        return;
      }
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(API_URL, { params: { q: city, appid: API_KEY, units: unit } });
        if (!cancelled) setWeather(response.data);
      } catch (err) {
        if (cancelled) return;
        setWeather(null);
        if (err.response?.status === 404) setError(`We couldn't find “${city}”. Check the spelling and try another city.`);
        else if (err.response?.status === 401) setError("The API key is invalid or not activated yet. Check your OpenWeather key.");
        else if (!err.response) setError("Network connection failed. Check your internet connection and try again.");
        else setError("Weather data could not be loaded. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchWeather();
    return () => { cancelled = true; };
  }, [city, unit]);

  const degree = unit === "metric" ? "°C" : "°F";
  return <div className="weather-panel">
    <div className="panel-head">
      <div className="location"><span className="location-icon">⌖</span><div><strong>{weather ? `${weather.name}${weather.sys?.country ? `, ${weather.sys.country}` : ""}` : city}</strong><small>Current conditions</small></div></div>
      <div className="units"><button className={unit === "metric" ? "active" : ""} onClick={() => setUnit("metric")} aria-pressed={unit === "metric"}>°C</button><button className={unit === "imperial" ? "active" : ""} onClick={() => setUnit("imperial")} aria-pressed={unit === "imperial"}>°F</button></div>
    </div>
    {loading ? <div className="message"><span className="loader"/><strong>Fetching the forecast…</strong><p>Checking current conditions for {city}</p></div> :
    error ? <div className="message"><span className="weather-symbol">☁</span><strong>{API_KEY ? "Weather unavailable" : "One quick setup step"}</strong><p>{error}</p>{!API_KEY && <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer">Get a free API key ↗</a>}</div> :
    weather ? <>
      <div className="current">
        <div className="temp-wrap"><img src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt={weather.weather?.[0]?.description || "Weather icon"}/><div><div className="temperature">{Math.round(weather.main.temp)}<sup>{degree}</sup></div><small>Feels like {Math.round(weather.main.feels_like)}{degree}</small></div></div>
        <div className="description"><strong>{weather.weather?.[0]?.description}</strong><span>H {Math.round(weather.main.temp_max)}° · L {Math.round(weather.main.temp_min)}°</span></div>
      </div>
      <div className="metrics">
        <Metric icon="♧" label="Humidity" value={`${weather.main.humidity}%`}/>
        <Metric icon="↗" label="Wind speed" value={`${weather.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`}/>
        <Metric icon="◉" label="Pressure" value={`${weather.main.pressure} hPa`}/>
        <Metric icon="☼" label="Sunrise" value={weather.sys?.sunrise ? localTime(weather.sys.sunrise, weather.timezone || 0) : "—"}/>
      </div>
    </> : null}
    <div className="panel-foot"><span><i/> OpenWeather data</span><span>Updates when you search</span></div>
  </div>;
}

function Metric({ icon, label, value }) {
  return <div className="metric"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><strong>{value}</strong></div>;
}