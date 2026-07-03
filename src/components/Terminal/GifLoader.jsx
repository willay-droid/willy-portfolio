import { useEffect, useState } from "react";

export default function GifLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        return prev + 10;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const blocks = Math.round(progress / 5);
  const bar = "█".repeat(blocks) + "░".repeat(20 - blocks);

  return (
    <p className="gif-loader">
      [{bar}] {progress}%
    </p>
  );
}
