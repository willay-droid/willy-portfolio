import { useEffect, useState } from "react";
import { brand } from "../../data/brand";

const bootLines = [
  "Initializing kernel",
  "Loading shell interface",
  "Mounting portfolio database",
  "Checking command parser",
  "Loading ROOT identity",
  "Starting interactive session",
];

export default function BootScreen({ onComplete }) {
  const [line, setLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLine((prev) => Math.min(prev + 1, bootLines.length));
    }, 350);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <main className="terminal-screen">
      <section className="terminal-box">
        <p>{brand.logo}</p>
        <p>{brand.name}</p>
        <p className="dim">{brand.subtitle}</p>
        <br />

        {bootLines.slice(0, line).map((item) => (
          <p key={item}>
            &gt; {item} <span className="ok">[ OK ]</span>
          </p>
        ))}

        <br />
        <p>&gt; Loading theme [{progress}%]</p>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>
    </main>
  );
}
