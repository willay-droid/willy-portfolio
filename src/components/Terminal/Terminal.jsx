import { useEffect, useRef, useState } from "react";
import { brand } from "../../data/brand";
import { commands } from "../../data/commands";
// import { filesystem, files } from "../../data/filesystem";
import { links, projects } from "../../data/links";
import {
  HOME_PATH,
  normalizePath,
  getNodeByPath,
  formatPromptPath,
} from "./terminal/fileSystemUtils";
import { neofetch } from "../../data/neofetch";
import { manuals } from "../../data/manuals";
import { fortunes } from "../../data/fortunes";
import MatrixRain from "./MatrixRain";
// import { useEffect } from "react";
import audioManager from "../../utils/audioManager";
import enterSound from "../../assets/sounds/enter.mp3";
import successSound from "../../assets/sounds/success.mp3";
import errorSound from "../../assets/sounds/error.mp3";
import matrixSound from "../../assets/sounds/matrix.mp3";
import hologramSound from "../../assets/sounds/hologram.mp3";
import launcherSound from "../../assets/sounds/launcher.mp3";
import backTerminalSound from "../../assets/sounds/backtoterminal.mp3";
import ProfileGif from "./ProfileGif";
import GifLoader from "./GifLoader";

const commandList = Object.keys(commands);

export default function Terminal({ onOpenGui }) {
  const [currentPath, setCurrentPath] = useState(HOME_PATH);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: `${brand.logo} ${brand.name}` },
    { type: "dim", text: "session initialized" },
    { type: "dim", text: "type `help` to see available commands" },
  ]);
  const [matrixMode, setMatrixMode] = useState(false);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const inputRef = useRef(null); // TAMBAH INI
  const bottomRef = useRef(null);

  const prompt = `root@willy:${formatPromptPath(currentPath)}$`;

  audioManager.load("launcher", launcherSound, {
    volume: 0.45,
  });

  audioManager.load("back", backTerminalSound, {
    volume: 0.45,
  });

  useEffect(() => {
    audioManager.load("enter", enterSound, {
      volume: 0.4,
    });

    audioManager.load("success", successSound, {
      volume: 0.4,
    });

    audioManager.load("error", errorSound, {
      volume: 0.4,
    });

    audioManager.load("matrix", matrixSound, {
      volume: 0.15,
      loop: true,
    });

    audioManager.load("hologram", hologramSound, {
      volume: 0.45,
    });
  }, []);

  useEffect(() => {
    if (!matrixMode) return;

    const timer = setTimeout(() => {
      setMatrixMode(false);
      audioManager.stop("matrix");
    }, 3000);

    return () => {
      clearTimeout(timer);
      audioManager.stop("matrix");
    };
  }, [matrixMode]);

  const commandCountRef = useRef(0);

  useEffect(() => {
    if (commandCountRef.current === 0) return;

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isRunning]);
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [history, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isRunning]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function runCommand(e) {
    e.preventDefault();

    const raw = input.trim();
    const cmd = raw.toLowerCase();
    const isStartGui = ["startx", "gui", "desktop"].includes(cmd);

    if (!cmd || isRunning) return;

    audioManager.play("enter");

    setInput("");
    setIsRunning(true);
    setHistoryIndex(null);
    setCommandHistory((prev) => [...prev, raw]);
    commandCountRef.current += 1;

    if (cmd === "clear") {
      setHistory([]);
      setIsRunning(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return;
    }

    if (isStartGui) {
      setHistory((prev) => [...prev, { type: "command", prompt, text: raw }]);

      const bootLines = [
        "Starting X Server...",
        "Loading Desktop Environment...",
        "Loading Wallpaper...",
        "Loading Widgets...",
        "Loading Window Manager...",
        "Launching WILLY OS...",
      ];

      for (const line of bootLines) {
        await delay(350);
        setHistory((prev) => [...prev, { type: "dim", text: line }]);
      }

      await delay(300);

      setHistory((prev) => [
        ...prev,
        { type: "system", text: "████████████████████ 100%" },
        { type: "dim", text: "→ Fade to GUI" },
      ]);

      audioManager.play("success");

      await delay(650);
      onOpenGui?.();

      return;
    }

    await delay(180);

    setHistory((prev) => [
      ...prev,
      { type: "command", prompt, text: raw },
      { type: "dim", text: "executing command..." },
    ]);

    await delay(220);

    const output = getOutput(cmd, raw);
    if (output.some((item) => item.type === "profileGifSequence")) {
      setHistory((prev) => [
        ...prev,
        { type: "dim", text: "loading foto.gif..." },
        { type: "gifLoader" },
      ]);

      await delay(1000);

      setHistory((prev) => [
        ...prev,
        { type: "profileGif" },
        { type: "dim", text: "done." },
      ]);

      audioManager.play("success");
      setIsRunning(false);
      return;
    }

    const hasError = output.some((item) => item.type === "error");

    setHistory((prev) => [...prev, ...output]);

    if (hasError) {
      audioManager.play("error");
    } else {
      audioManager.play("success");
    }

    setIsRunning(false);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);

    if (!section) {
      return false;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    return true;
  }

  function buildTree(node, prefix = "") {
    if (!node || node.type !== "dir") return [];

    const entries = Object.entries(node.children);

    return entries.flatMap(([name, item], index) => {
      const isLast = index === entries.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      const displayName = item.type === "dir" ? `${name}/` : name;

      const currentLine = {
        type: item.type === "dir" ? "folder" : "file",
        text: `${prefix}${connector}${displayName}`,
      };

      if (item.type === "dir") {
        return [currentLine, ...buildTree(item, nextPrefix)];
      }

      return [currentLine];
    });
  }

  function grepFile(content, keyword) {
    return content
      .split("\n")
      .filter((line) => line.toLowerCase().includes(keyword.toLowerCase()));
  }

  function findInFileSystem(node, keyword, current = currentPath) {
    if (!node) return [];

    const results = [];

    if (node.type === "dir") {
      Object.entries(node.children).forEach(([name, item]) => {
        const fullPath = current === "/" ? `/${name}` : `${current}/${name}`;

        if (name.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({
            type: item.type === "dir" ? "folder" : "file",
            text: fullPath + (item.type === "dir" ? "/" : ""),
          });
        }

        if (item.type === "dir") {
          results.push(...findInFileSystem(item, keyword, fullPath));
        }
      });
    }

    return results;
  }

  function getOutput(cmd, raw) {
    if (cmd === "help") {
      return [{ type: "box", title: "AVAILABLE COMMANDS", children: <Help /> }];
    }

    if (cmd === "pwd") {
      return [{ type: "system", text: currentPath }];
    }

    if (cmd === "tree") {
      const node = getNodeByPath(currentPath);

      if (!node || node.type !== "dir") {
        return [{ type: "error", text: "tree: cannot access directory" }];
      }

      return [{ type: "system", text: "." }, ...buildTree(node)];
    }

    if (cmd === "neofetch") {
      return [
        {
          type: "neofetch",
          data: neofetch,
        },
      ];
    }

    if (cmd === "find") {
      return [{ type: "error", text: "find: missing search keyword" }];
    }

    if (cmd.startsWith("find ")) {
      const keyword = raw.slice(5).trim();

      if (!keyword) {
        return [{ type: "error", text: "find: missing search keyword" }];
      }

      const rootNode = getNodeByPath("/");
      const results = findInFileSystem(rootNode, keyword, "/");

      if (results.length === 0) {
        return [{ type: "dim", text: `find: no result for "${keyword}"` }];
      }

      return results;
    }

    if (cmd === "man") {
      return [{ type: "error", text: "man: missing command" }];
    }

    if (cmd.startsWith("man ")) {
      const target = raw.slice(4).trim().toLowerCase();

      if (!manuals[target]) {
        return [{ type: "error", text: `man: no manual entry for ${target}` }];
      }

      return [
        {
          type: "manual",
          command: target,
          data: manuals[target],
        },
      ];
    }

    if (cmd === "grep") {
      return [
        {
          type: "error",
          text: "grep: missing pattern",
        },
      ];
    }

    if (cmd.startsWith("grep ")) {
      const args = raw.slice(5).trim().split(/\s+/);

      if (args.length < 2) {
        return [
          {
            type: "error",
            text: "Usage: grep <keyword> <file>",
          },
        ];
      }

      const keyword = args[0];
      const target = args.slice(1).join(" ");

      const resolved = normalizePath(currentPath, target);

      const node = getNodeByPath(resolved);

      if (!node) {
        return [
          {
            type: "error",
            text: `grep: ${target}: No such file`,
          },
        ];
      }

      if (node.type !== "file") {
        return [
          {
            type: "error",
            text: `grep: ${target}: Is a directory`,
          },
        ];
      }

      const matches = grepFile(node.content, keyword);

      if (matches.length === 0) {
        return [
          {
            type: "dim",
            text: `No matches found.`,
          },
        ];
      }

      return matches.map((line) => ({
        type: "system",
        text: line,
      }));
    }

    if (cmd === "whoami") {
      return [
        {
          type: "system",
          text: "willy",
        },
      ];
    }

    if (cmd === "uname") {
      return [
        {
          type: "system",
          text: "WillyOS 1.0 Browser Edition",
        },
      ];
    }

    if (cmd === "date") {
      return [
        {
          type: "system",
          text: new Date().toString(),
        },
      ];
    }

    if (cmd === "coffee") {
      return [
        {
          type: "dim",
          text: "☕ Brewing coffee...",
        },

        {
          type: "system",
          text: "Developer performance +50%",
        },
      ];
    }

    if (cmd === "fortune") {
      const quote = fortunes[Math.floor(Math.random() * fortunes.length)];

      return [
        {
          type: "system",
          text: quote,
        },
      ];
    }

    if (cmd.startsWith("sudo")) {
      return [
        {
          type: "error",
          text: "Permission denied.",
        },

        {
          type: "dim",
          text: "Nice try 😎",
        },
      ];
    }

    if (cmd.startsWith("hack")) {
      return [
        {
          type: "dim",
          text: "Connecting...",
        },

        {
          type: "system",
          text: "████████████████",
        },

        {
          type: "error",
          text: "ACCESS DENIED",
        },

        {
          type: "dim",
          text: "The FBI has been notified 😂",
        },
      ];
    }

    if (cmd === "matrix") {
      setMatrixMode(true);
      audioManager.playLoop("matrix");

      return [
        {
          type: "dim",
          text: "Initializing Matrix...",
        },

        {
          type: "dim",
          text: "Entering the Matrix...",
        },
      ];
    }

    if (cmd === "gui") {
      setTimeout(() => {
        onOpenGui?.();
      }, 700);

      return [
        {
          type: "dim",
          text: "Initializing Willy OS GUI...",
        },
        {
          type: "system",
          text: "Loading desktop environment...",
        },
      ];
    }

    if (cmd === "ls") {
      const node = getNodeByPath(currentPath);

      if (!node || node.type !== "dir") {
        return [{ type: "error", text: "ls: cannot access directory" }];
      }

      return [
        {
          type: "ls",
          items: Object.entries(node.children).map(([name, item]) => ({
            name: item.type === "dir" ? `${name}/` : name,
            type: item.type,
          })),
        },
      ];
    }

    if (cmd.startsWith("cd")) {
      const target = raw.slice(2).trim() || "~";
      const nextPath = normalizePath(currentPath, target);
      const node = getNodeByPath(nextPath);

      if (!node) {
        return [
          { type: "error", text: `cd: no such file or directory: ${target}` },
        ];
      }

      if (node.type !== "dir") {
        return [{ type: "error", text: `cd: not a directory: ${target}` }];
      }

      setCurrentPath(nextPath);
      return [];
    }

    if (cmd.startsWith("cat")) {
      const target = raw.slice(3).trim();

      if (target === "foto.gif" || target === "profile/foto.gif") {
        return [{ type: "profileGifSequence" }];
      }

      if (!target) {
        return [{ type: "error", text: "cat: missing file operand" }];
      }

      const targetPath = normalizePath(currentPath, target);
      const node = getNodeByPath(targetPath);

      if (!node) {
        return [{ type: "error", text: `cat: ${target}: No such file` }];
      }

      if (node.type !== "file") {
        return [{ type: "error", text: `cat: ${target}: Is a directory` }];
      }

      return [{ type: "system", text: node.content }];
    }

    if (cmd === "open") {
      return [{ type: "error", text: "open: missing target" }];
    }

    if (cmd.startsWith("open ")) {
      const target = raw.slice(5).trim().toLowerCase();

      if (links[target]) {
        window.open(links[target], "_blank");

        return [
          { type: "dim", text: `opening ${target}...` },
          { type: "system", text: `target: ${links[target]}` },
        ];
      }

      if (projects[target]) {
        return [
          {
            type: "project",
            project: projects[target],
          },
        ];
      }

      return [
        { type: "error", text: `open: target not found: ${target}` },
        { type: "dim", text: "try `open github` or `open telegram-bots`" },
      ];
    }

    if (cmd === "whois willy") {
      return [{ type: "box", title: "WHOIS WILLY", children: <Profile /> }];
    }

    if (cmd === "skills") {
      return [{ type: "box", title: "SKILLS", children: <Skills /> }];
    }

    if (cmd === "modules") {
      return [{ type: "box", title: "MODULES", children: <Modules /> }];
    }

    if (cmd === "contact") {
      return [{ type: "box", title: "CONTACT", children: <Contact /> }];
    }

    return [
      { type: "error", text: `command not found: ${raw}` },
      { type: "dim", text: suggestCommand(cmd) },
    ];
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setInput("");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const parts = input.trim().split(" ");
      const first = parts[0] || "";
      const second = parts[1] || "";

      const baseCommands = [
        "help",
        "pwd",
        "ls",
        "cd",
        "cat",
        "open",
        "whois",
        "skills",
        "modules",
        "contact",
        "clear",
        "tree",
        "neofetch",
        "find",
        "man",
        "grep",
        "whoami",
        "uname",
        "date",
        "fortune",
        "coffee",
        "sudo",
        "hack",
        "matrix",
        "startx",
        "gui",
        "desktop",
      ];

      // autocomplete command pertama
      if (parts.length === 1) {
        const matches = baseCommands.filter((cmd) => cmd.startsWith(first));

        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: "system", text: matches.join("  ") },
          ]);
        }

        return;
      }

      // autocomplete target untuk cd/cat/open
      if (["cd", "cat"].includes(first)) {
        const node = getNodeByPath(currentPath);

        if (!node || node.type !== "dir") return;

        const matches = Object.entries(node.children)
          .filter(([name]) => name.startsWith(second))
          .map(([name, item]) => (item.type === "dir" ? `${name}/` : name));

        if (matches.length === 1) {
          setInput(`${first} ${matches[0]}`);
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: "system", text: matches.join("  ") },
          ]);
        }

        return;
      }

      if (first === "open") {
        const openTargets = [
          "github",
          "linkedin",
          "whatsapp",
          "email",
          "cv",
          "portfolio",
          "telegram-bots",
          "qr-attendance",
        ];

        const matches = openTargets.filter((item) => item.startsWith(second));

        if (matches.length === 1) {
          setInput(`open ${matches[0]}`);
        } else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: "system", text: matches.join("  ") },
          ]);
        }

        return;
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  }

  return (
    <main
      className="terminal-screen"
      onClick={() => document.querySelector(".terminal-input")?.focus()}
    >
      {matrixMode && (
        <div className="matrix-overlay">
          {Array.from({ length: 55 }).map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 2}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 1.5}s`,
              }}
            >
              {Array.from({ length: 35 }, () =>
                Math.random() > 0.5 ? "1" : "0",
              ).join("\n")}
            </div>
          ))}
        </div>
      )}

      <section className="terminal-box">
        <div className="terminal-header">
          <div className="terminal-header-left">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>

            <span className="terminal-title">Willy Terminal OS</span>
          </div>

          <div className="terminal-header-right">
            <span className="terminal-path">
              root@willy:{formatPromptPath(currentPath)}
            </span>

            <span className="terminal-status">● ONLINE</span>
          </div>
        </div>

        <div className="terminal-divider"></div>
        <span className="crt-lines"></span>
        <span className="crt-sweep"></span>

        <span className="frame-light frame-light-top"></span>
        <span className="frame-light frame-light-right"></span>
        <span className="frame-light frame-light-bottom"></span>
        <span className="frame-light frame-light-left"></span>
        {history.map((item, i) => (
          <Output key={i} item={item} />
        ))}

        {isRunning && <p className="dim">processing...</p>}

        <form onSubmit={runCommand} className="input-row">
          <span>{prompt}</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRunning}
            className="terminal-input"
            placeholder={isRunning ? "running..." : "type help"}
          />
        </form>

        <div ref={bottomRef} />
      </section>
    </main>
  );
}

function Output({ item }) {
  if (item.type === "system") return <p>{item.text}</p>;
  if (item.type === "dim") return <p className="dim">{item.text}</p>;
  if (item.type === "error") return <p className="error">{item.text}</p>;

  if (item.type === "gifLoader") {
    return <GifLoader />;
  }

  if (item.type === "profileGif") {
    return <ProfileGif />;
  }

  if (item.type === "folder") {
    return <p className="terminal-folder">{item.text}</p>;
  }

  if (item.type === "file") {
    return <p className="terminal-file">{item.text}</p>;
  }

  if (item.type === "command") {
    return (
      <p>
        {item.prompt} {item.text}
      </p>
    );
  }

  if (item.type === "manual") {
    return (
      <div className="manual-page">
        <p className="manual-title">{item.command.toUpperCase()}(1)</p>

        <p className="manual-heading">NAME</p>
        <p className="manual-indent">{item.data.name}</p>

        <p className="manual-heading">SYNOPSIS</p>
        <p className="manual-indent">{item.data.synopsis}</p>

        <p className="manual-heading">DESCRIPTION</p>
        <p className="manual-indent">{item.data.description}</p>

        <p className="manual-heading">EXAMPLES</p>
        {item.data.examples.map((example) => (
          <p className="manual-indent" key={example}>
            {example}
          </p>
        ))}
      </div>
    );
  }

  if (item.type === "ls") {
    return (
      <p>
        {item.items.map((entry) => (
          <span
            key={entry.name}
            className={
              entry.type === "dir"
                ? "terminal-folder-inline"
                : "terminal-file-inline"
            }
          >
            {entry.name}{" "}
          </span>
        ))}
      </p>
    );
  }

  if (item.type === "directory") {
    return (
      <div className="directory-output">
        <p className="dim">{item.path}</p>
        <div className="directory-grid">
          {item.items.map((file) => (
            <span
              key={file}
              className={file.endsWith("/") ? "directory-name" : "file-name"}
            >
              {file}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "file") {
    return (
      <div className="file-output">
        <p className="dim">{item.path}</p>
        <pre>{item.content}</pre>
      </div>
    );
  }

  if (item.type === "neofetch") {
    const { logo, info } = item.data;

    return (
      <div className="neofetch-output">
        <div className="neofetch-logo">
          {logo.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <div className="neofetch-info">
          {info.map(([key, value]) => (
            <p key={key}>
              <span className="neo-key">{key}</span>
              <span className="neo-separator"> : </span>
              <span className="neo-value">{value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "matrix") {
    return (
      <pre className="matrix">
        0101010010101010101010 1010100101010101001010 0101010010101010101010
        1010010101010101010101 0101010100101010101001 1010101010010101010101
      </pre>
    );
  }

  if (item.type === "project") {
    return (
      <div className="project-output">
        <p className="project-title">{item.project.title}</p>
        <p>
          Status : <span className="blue">{item.project.status}</span>
        </p>
        <p>Stack&nbsp;&nbsp;: {item.project.stack}</p>
        <br />
        <p className="dim">{item.project.description}</p>
      </div>
    );
  }

  if (item.type === "box") {
    return (
      <div className="result-box">
        <p className="result-title">{item.title}</p>
        {item.children}
      </div>
    );
  }

  return null;
}

function Help() {
  return (
    <div className="grid-box">
      {Object.entries(commands).map(([cmd, desc]) => (
        <div key={cmd} className="grid-row">
          <span>{cmd}</span>
          <span className="dim">- {desc}</span>
        </div>
      ))}
    </div>
  );
}

function Profile() {
  return (
    <div className="result-content">
      <p>
        Name&nbsp;&nbsp;: <span className="blue">WILLYANTO DIHARJO</span>
      </p>
      <p>Role&nbsp;&nbsp;: Automation Builder</p>
      <p>Status: Available</p>
      <br />
      <p className="dim">
        IT graduate focused on web development, automation systems, Telegram
        bots, monitoring tools, QR systems, and Google Apps Script.
      </p>
    </div>
  );
}

function Skills() {
  const skills = [
    ["Automation", 96],
    ["Telegram Bot", 92],
    ["Google Apps Script", 90],
    ["JavaScript", 84],
    ["React", 80],
    ["MySQL", 78],
  ];

  return (
    <div>
      {skills.map(([name, value]) => (
        <p key={name}>
          {name.padEnd(18, ".")} [{bar(value)}] {value}%
        </p>
      ))}
    </div>
  );
}

function Modules() {
  return (
    <div className="result-content">
      <p>MOD-001 | QR Absensi System&nbsp;&nbsp;&nbsp;&nbsp; | ONLINE</p>
      <p>MOD-002 | Bot Reminder Jadwal&nbsp;&nbsp; | ACTIVE</p>
      <p>
        MOD-003 | Monitoring Alker&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | ONLINE
      </p>
      <p>MOD-004 | Bot Datek Profil OLT | ACTIVE</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="result-content">
      <p>
        WhatsApp :{" "}
        <a href="https://wa.me/6282218937297" target="_blank" rel="noreferrer">
          +6282218937297
        </a>
      </p>
      <p>
        Email&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
        <a href="mailto:w.diharjo7@gmail.com">w.diharjo7@gmail.com</a>
      </p>
      <p>
        Github&nbsp;&nbsp;&nbsp;:{" "}
        <a
          href="https://github.com/willay-droid"
          target="_blank"
          rel="noreferrer"
        >
          github.com/willay-droid
        </a>
      </p>
    </div>
  );
}

function bar(value) {
  const total = 18;
  const filled = Math.round((value / 100) * total);
  return "#".repeat(filled) + "-".repeat(total - filled);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function suggestCommand(cmd) {
  const suggestion = commandList.find(
    (item) => item.includes(cmd[0]) || item.startsWith(cmd.slice(0, 2)),
  );

  if (suggestion) {
    return `did you mean: ${suggestion} ?`;
  }

  return "try `help`";
}
