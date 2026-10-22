import { useState } from "react";
import WeatherPanel from "./components/WeatherPanel";

const popularCities = ["Singapore", "Chennai", "London", "Tokyo"];

export default function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Singapore");
  const [recent, setRecent] = useState(["Singapore", "Chennai", "London"]);

  function search(event) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setCity(value);
    setRecent(old => [value, ...old.filter(item => item.toLowerCase() !== value.toLowerCase())].slice(0, 5));
    setInput("");
  }

  function chooseCity(value) {
    setCity(value);
    setRecent(old => [value, ...old.filter(item => item.toLowerCase() !== value.toLowerCase())].slice(0, 5));
  }

  return <div className="shell">
    <header className="topbar">
      <a className="brand" href="#home"><span className="brand-icon">✦</span> skycast<span className="brand-dot">.</span></a>
      <div className="live"><i /> LIVE WEATHER <span className="divider"/> <span className="muted">Global forecast</span></div>
    </header>
    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> YOUR DAILY WEATHER COMPANION</div>
          <h1>Every forecast.<br/><em>One clear view.</em></h1>
          <p>Find the weather anywhere in the world. Plan your day with confidence.</p>
          <form className="search" onSubmit={search}>
            <span className="magnify">⌕</span>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a city name..." aria-label="City name"/>
            <button disabled={!input.trim()}>Search <b>→</b></button>
          </form>
          <div className="popular"><span>POPULAR:</span>{popularCities.map(item => <button key={item} type="button" onClick={() => chooseCity(item)}>{item}</button>)}</div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit1"/><div className="orbit orbit2"/><div className="sun">☀</div><div className="cloud">☁</div><div className="cloud small">☁</div><span className="star star1">✦</span><span className="star star2">✧</span></div>
      </section>
      <section className="weather-section">
        <div className="section-title"><div><small>RIGHT NOW</small><h2>Weather report</h2></div><span className="hint"><i/> Live data when API is connected</span></div>
        <WeatherPanel city={city}/>
      </section>
      <section className="recent-section">
        <div className="section-title"><div><small>QUICK ACCESS</small><h2>Recently searched</h2></div><span className="muted">{recent.length} cities</span></div>
        <div className="recent-grid">{recent.map((item, index) => <button className="recent-card" key={`${item}-${index}`} onClick={() => chooseCity(item)}><span className="pin">⌖</span><strong>{item}</strong><span className="arrow">↗</span></button>)}</div>
      </section>
    </main>
    <footer><a className="brand footer-brand" href="#home"><span className="brand-icon">✦</span> skycast<span className="brand-dot">.</span></a><span>Weather changes. Stay prepared.</span><span>Built with React + OpenWeather</span></footer>
  </div>;
}