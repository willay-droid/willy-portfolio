import { useEffect, useState } from "react";
import "./GuiDesktop.css";

import Topbar from "./components/Topbar";
import Wallpaper from "./components/Wallpaper";
import WeatherWidget from "./components/WeatherWidget";
import ClockWidget from "./components/ClockWidget";
import DesktopIcons from "./components/DesktopIcons";
import { getAppById } from "./system/appRegistry";
import Window from "./components/Window";
import Hero from "../components/Hero/Hero";
import SystemInfo from "../components/SystemInfo/SystemInfo";

import { brand } from "../data/brand";
import { links, projects } from "../data/links";

import audioManager from "../utils/audioManager";

const launcherApps = [
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "projects", icon: "💼", label: "Projects" },
  { id: "gallery", icon: "🖼️", label: "Gallery" },
  { id: "contact", icon: "📞", label: "Contact" },
  { id: "resume", icon: "📄", label: "Resume" },
];

function getClock(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function GuiDesktop({ onExit }) {
  const [time, setTime] = useState(new Date());
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      audioManager.play("hologram");
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId) => {
    const app = getAppById(appId);
    if (!app) return;

    setOpenWindows((current) => {
      const alreadyOpen = current.find((item) => item.id === appId);

      if (alreadyOpen) {
        return [...current.filter((item) => item.id !== appId), alreadyOpen];
      }

      return [...current, app];
    });

    setLauncherOpen(false);
  };

  const closeApp = (appId) => {
    setOpenWindows((current) => current.filter((app) => app.id !== appId));
  };

  const focusApp = (appId) => {
    setOpenWindows((current) => {
      const target = current.find((app) => app.id === appId);
      if (!target) return current;

      return [...current.filter((app) => app.id !== appId), target];
    });
  };

  return (
    <main className={`gui-os ${launcherOpen ? "launcher-active" : ""}`}>
      <Wallpaper />
      <Topbar time={time} />
      <WeatherWidget />
      <ClockWidget launcherOpen={launcherOpen} />
      <Hero launcherOpen={launcherOpen} />

      <section className="desktop-layer"></section>

      <button
        className="launcher-toggle"
        onClick={() => setLauncherOpen((value) => !value)}
        aria-label="Toggle launcher"
      >
        {launcherOpen ? "›" : "‹"}
      </button>

      <aside className="launcher-panel">
        <div className="launcher-header">
          <div>
            <p>Desktop Mode</p>
            <h3>Launcher</h3>
          </div>
          <button onClick={() => setLauncherOpen(false)}>×</button>
        </div>

        <div className="launcher-list">
          {launcherApps.map((app) => (
            <button key={app.id} onClick={() => openApp(app.id)}>
              <span>{app.icon}</span>
              <strong>{app.label}</strong>
            </button>
          ))}

          <button className="terminal-mode" onClick={onExit}>
            <span>💻</span>
            <strong>Terminal Mode</strong>
          </button>
        </div>
      </aside>

      {openWindows.map((app, index) => (
        <Window
          key={app.id}
          app={app}
          index={index}
          onClose={() => closeApp(app.id)}
          onFocus={() => focusApp(app.id)}
        />
      ))}
    </main>
  );
}
