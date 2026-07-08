import "./Hero.css";
import { useEffect, useState } from "react";
import "./Hero.css";
import willy from "../../assets/profile/gallery/fotowilly.png";

export default function Hero({ launcherOpen = false }) {
  const [holoReady, setHoloReady] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoloReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`hero ${holoReady ? "hero-holo-ready" : ""} ${
        heroOpen ? "hero-open" : ""
      } ${launcherOpen ? "hero-shifted" : ""}`}
    >
      <div className="heroReveal heroIntro">
        <p>HELLO,</p>
        <p>I&apos;M</p>
        <h1>WILLY</h1>
      </div>

      <div className="heroPlatform">
        <div className="heroPhoto" onClick={() => setHeroOpen((v) => !v)}>
          <div className="heroGlow" />
          <div className="heroScan" />
          <img src={willy} alt="Willy" />
        </div>

        <div className="holoPlatform">
          <div className="holoRing ring1"></div>
          <div className="holoRing ring2"></div>
          <div className="holoCore"></div>
        </div>

        <div className="heroOrbitInfo">
          <article className="orbitCard orbitProfile">
            <span>PROFILE</span>
            <p>IT Graduate & Web Developer.</p>
          </article>

          <article className="orbitCard orbitProjects">
            <span>PROJECTS</span>
            <p>Portfolio OS, Bots, GAS, Web Tools.</p>
          </article>

          <article className="orbitCard orbitSkills">
            <span>SKILLS</span>
            <p>React, JavaScript, Automation, UI.</p>
          </article>

          <article className="orbitCard orbitContact">
            <span>CONTACT</span>
            <p>WhatsApp, Email, GitHub.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
