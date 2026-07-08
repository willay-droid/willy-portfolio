import { links } from "../../data/links";

export default function Resume() {
  return (
    <div className="app-content">
      <h2>Resume</h2>
      <p>Please click Open Resume to view my resume.</p>
      <a
        className="app-button"
        href={links.cv}
        target="_blank"
        rel="noreferrer"
      >
        Open Resume
      </a>
    </div>
  );
}
