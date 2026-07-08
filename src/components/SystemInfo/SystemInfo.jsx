import "./SystemInfo.css";

export default function SystemInfo({ launcherOpen }) {
  return (
    <section className={`systemInfo ${launcherOpen ? "systemInfoShift" : ""}`}>
      <div className="systemInfoHeader">
        <span>SYSTEM_INFO</span>
        <div>
          <span>−</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>

      <div className="systemRows">
        <div>
          <b>OS</b>
          <span>WILLY OS 1.0.0</span>
        </div>
        <div>
          <b>USER</b>
          <span>WILLY</span>
        </div>
        <div>
          <b>ROLE</b>
          <span>FULL STACK DEVELOPER</span>
        </div>
        <div>
          <b>STATUS</b>
          <span>AVAILABLE</span>
        </div>
        <div>
          <b>UPTIME</b>
          <span>7D 14H 32M</span>
        </div>
      </div>
    </section>
  );
}
