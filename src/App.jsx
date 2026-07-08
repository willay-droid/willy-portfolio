import { useState } from "react";

import BootScreen from "./components/Boot/BootScreen";
import Terminal from "./components/Terminal/Terminal";
import GuiApp from "./GuiApp";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [mode, setMode] = useState("cli");

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  if (mode === "gui") {
    return <GuiApp onExit={() => setMode("cli")} />;
  }

  return <Terminal onOpenGui={() => setMode("gui")} />;
}
