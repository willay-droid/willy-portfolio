import { useMemo } from "react";

export default function MatrixRain() {
  const columns = useMemo(() => {
    return Array.from({ length: 55 }, () =>
      Array.from({ length: 35 }, () => (Math.random() > 0.5 ? "1" : "0")).join(
        "",
      ),
    );
  }, []);

  return <pre className="matrix-rain">{columns.join("\n")}</pre>;
}
