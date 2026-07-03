import { useEffect, useState } from "react";

import neutral from "../../assets/profile/gallery/neutral.png";
import smile from "../../assets/profile/gallery/smile.png";
import laugh from "../../assets/profile/gallery/laugh.png";
import angry from "../../assets/profile/gallery/angry.png";
import thinking from "../../assets/profile/gallery/thinking.png";
import confused from "../../assets/profile/gallery/confused.png";
import blonde from "../../assets/profile/gallery/blonde.png";
import wink from "../../assets/profile/gallery/wink.png";
import glasses from "../../assets/profile/gallery/glasses.png";
import headphone from "../../assets/profile/gallery/headphone.png";
import pouting from "../../assets/profile/gallery/pouting.png";
import surprised from "../../assets/profile/gallery/surprised.png";

const frames = [
  neutral,
  smile,
  laugh,
  angry,
  thinking,
  confused,
  blonde,
  wink,
  glasses,
  headphone,
  pouting,
  surprised,
];

export default function ProfileGif() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 350);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="terminal-gif-card">
      <div className="terminal-gif-top">
        <span>● WILLY_OS</span>
        <span>PROFILE.GIF</span>
      </div>

      <div className="terminal-gif-circle">
        <img src={frames[index]} alt="Willy profile timelapse" />
      </div>

      <div className="terminal-gif-meta">
        <span>{frames.length} frames</span>
        <span>loop: ∞</span>
      </div>
    </div>
  );
}
