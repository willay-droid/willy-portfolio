import { Wifi, Circle, MonitorCog } from "lucide-react";
import { brand } from "../../data/brand";

function getDateLabel(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getShortTime(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Topbar({ time }) {
  return (
    <header className="os-topbar">
      <div className="os-brand">
        <span className="os-logo">
          <MonitorCog size={18} strokeWidth={2.4} />
        </span>
        <span>WILLY OS</span>
      </div>

      <div className="os-center">
        <span>{getDateLabel(time)}</span>
      </div>

      <div className="os-status">
        <span className="status-online">
          <Circle size={8} fill="currentColor" />
          ONLINE
        </span>

        <span>
          <Wifi size={15} />
          WI-FI
        </span>

        <span>{getShortTime(time)}</span>
      </div>
    </header>
  );
}
