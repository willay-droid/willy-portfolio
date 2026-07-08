import useClock from "../hooks/useClock";

export default function ClockWidget({ launcherOpen = false }) {
  const time = useClock();

  const hour = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = time.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = time.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      className={`desktop-clock-widget ${
        launcherOpen ? "desktop-clock-widget-shifted" : ""
      }`}
    >
      <strong>{hour}</strong>

      <span>{day}</span>

      <small>{date}</small>
    </section>
  );
}
