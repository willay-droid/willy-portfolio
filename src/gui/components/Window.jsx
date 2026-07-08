import { X } from "lucide-react";
import "./Window.css";

export default function Window({ app, index, onClose, onFocus }) {
  const AppComponent = app.component;

  const offset = index * 34;

  return (
    <section
      className="os-app-window"
      style={{
        left: `calc(50% - 360px + ${offset}px)`,
        top: `calc(50% - 285px + ${offset}px)`,
        zIndex: 40 + index,
      }}
      onMouseDown={onFocus}
    >
      <header className="os-app-titlebar">
        <div className="os-app-title">
          <app.icon size={17} />
          <span>{app.label}</span>
        </div>

        <button onClick={onClose} aria-label={`Close ${app.label}`}>
          <X size={16} />
        </button>
      </header>

      <div className="os-app-body">
        <AppComponent />
      </div>
    </section>
  );
}
