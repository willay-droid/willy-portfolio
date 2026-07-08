import { useState } from "react";
import { appRegistry } from "../system/appRegistry";
import "./DesktopIcons.css";

export default function DesktopIcons({ onOpenApp }) {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <section className="desktop-icons">
      {appRegistry.map((app, index) => {
        const Icon = app.icon;
        const isSelected = selectedApp === app.id;

        return (
          <button
            key={app.id}
            className={`desktop-icon desktop-icon-${index + 1} ${isSelected ? "selected" : ""}`}
            onClick={() => setSelectedApp(app.id)}
            onDoubleClick={() => onOpenApp(app.id)}
          >
            <span className="desktop-icon-box">
              <Icon size={34} strokeWidth={1.9} />
            </span>
            <small>{app.label}</small>
          </button>
        );
      })}
    </section>
  );
}
