import { links } from "../../data/links";

export default function Contact() {
  return (
    <div className="app-content contact-list">
      <a href={links.whatsapp} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      <a href={links.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={links.email}>Email</a>
    </div>
  );
}
