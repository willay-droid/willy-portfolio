import { useState } from "react";
import BootScreen from "./components/Boot/BootScreen";
import Terminal from "./components/Terminal/Terminal";

export default function App() {
  const [screen, setScreen] = useState("boot");

  if (screen === "boot") {
    return <BootScreen onComplete={() => setScreen("terminal")} />;
  }

  return <Terminal />;
}
