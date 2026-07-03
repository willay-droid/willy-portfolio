export const manuals = {
  help: {
    name: "help - show available commands",
    synopsis: "help",
    description: "Display all commands available in Willy OS terminal.",
    examples: ["help"],
  },

  pwd: {
    name: "pwd - print working directory",
    synopsis: "pwd",
    description: "Print the current virtual filesystem directory.",
    examples: ["pwd"],
  },

  ls: {
    name: "ls - list directory contents",
    synopsis: "ls",
    description: "List files and folders inside the current directory.",
    examples: ["ls", "cd projects && ls"],
  },

  cd: {
    name: "cd - change directory",
    synopsis: "cd <directory>",
    description: "Move between directories in the virtual filesystem.",
    examples: ["cd projects", "cd ..", "cd /", "cd ~"],
  },

  cat: {
    name: "cat - display file content",
    synopsis: "cat <file>",
    description: "Read and display the content of a virtual file.",
    examples: ["cat about.txt", "cat projects/portfolio/readme.txt"],
  },

  open: {
    name: "open - open link or project module",
    synopsis: "open <target>",
    description: "Open external links or display project information.",
    examples: ["open github", "open whatsapp", "open portfolio"],
  },

  tree: {
    name: "tree - show directory tree",
    synopsis: "tree",
    description: "Display the current directory structure recursively.",
    examples: ["tree", "cd projects && tree"],
  },

  neofetch: {
    name: "neofetch - show Willy OS information",
    synopsis: "neofetch",
    description:
      "Display Willy OS identity, shell, framework, and system profile.",
    examples: ["neofetch"],
  },

  find: {
    name: "find - search file or folder",
    synopsis: "find <keyword>",
    description:
      "Search files and folders recursively from the virtual filesystem root.",
    examples: ["find readme", "find about", "find bot"],
  },

  clear: {
    name: "clear - clear terminal",
    synopsis: "clear",
    description: "Clear terminal output history.",
    examples: ["clear"],
  },

  grep: {
    name: "grep - search text in file",

    synopsis: "grep <keyword> <file>",

    description: "Search text inside a virtual file.",

    examples: [
      "grep React about.txt",
      "grep JavaScript skills.txt",
      "grep Google about.txt",
    ],
  },
};
