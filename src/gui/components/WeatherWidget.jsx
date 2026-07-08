import { CloudSun, Droplets, Wind } from "lucide-react";

export default function WeatherWidget() {
  return (
    <section className="desktop-weather-widget">
      <div className="weather-widget-head">
        <CloudSun size={34} strokeWidth={2.2} />
        <div>
          <strong>29°</strong>
          <span>Surabaya</span>
        </div>
      </div>

      <div className="weather-widget-meta">
        <span>
          <Droplets size={14} />
          78%
        </span>

        <span>
          <Wind size={14} />8 km/h
        </span>
      </div>
    </section>
  );
}
