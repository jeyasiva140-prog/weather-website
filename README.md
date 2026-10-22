<<<<<<< HEAD
# SkyCast — Weather Report React App

Responsive weather report app built with React, Axios and the OpenWeather API.

## Features
- React functional components and hooks (`useState`, `useEffect`)
- Separate `WeatherPanel` component for weather/API logic
- Axios GET request with dynamic city query
- Search form and popular-city shortcuts
- Celsius/Fahrenheit toggle
- Loading, invalid city, invalid API key, and network error states
- Responsive Flexbox/Grid layout for mobile, tablet, desktop and wide screens
- Automatic GitHub Pages deployment with GitHub Actions

## Run locally
Install Node.js 20+ then:

```bash
npm install
npm run dev
```

## Add your OpenWeather API key
1. Get a free key at https://openweathermap.org/api.
2. Copy `.env.example` to `.env`.
3. Set `VITE_OPENWEATHER_API_KEY=your_real_api_key`.
4. Restart `npm run dev`. New API keys may take a little while to activate.

For GitHub Pages, add a repository Actions variable named `VITE_OPENWEATHER_API_KEY` under **Settings → Secrets and variables → Actions → Variables**. The workflow passes it into the build. Vite client-side keys are visible in the browser, so use a key intended for public client-side use; production apps should proxy API requests through a backend.

## Deploy
1. Push this project to the `main` branch of a GitHub repository.
2. Open **Settings → Pages** and select **GitHub Actions** as the source.
3. Check the Actions tab and wait for `Deploy Weather Report to GitHub Pages` to succeed.
4. The deployment job shows the live site URL. Every push to `main` deploys again.

## Structure
```text
weather-report-react/
├── .github/workflows/deploy.yml
├── src/components/WeatherPanel.jsx
├── src/App.jsx
├── src/main.jsx
├── src/styles.css
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```
=======
# weather-website
>>>>>>> cfd09710c9d5dc9735e2f1180521246d148e444e
