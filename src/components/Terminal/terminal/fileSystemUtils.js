import { fileSystem } from "./fileSystem";

export const HOME_PATH = "/home/willy";

export function pathToArray(path) {
  return path.split("/").filter(Boolean);
}

export function normalizePath(currentPath, targetPath) {
  if (!targetPath || targetPath === "~") return HOME_PATH;

  let parts = targetPath.startsWith("/") ? [] : pathToArray(currentPath);

  const targetParts = pathToArray(targetPath);

  for (const part of targetParts) {
    if (part === ".") continue;

    if (part === "..") {
      parts.pop();
    } else {
      parts.push(part);
    }
  }

  return "/" + parts.join("/");
}

export function getNodeByPath(path) {
  if (path === "/") return fileSystem["/"];

  const parts = pathToArray(path);
  let current = fileSystem["/"];

  for (const part of parts) {
    if (!current.children || !current.children[part]) {
      return null;
    }

    current = current.children[part];
  }

  return current;
}

export function formatPromptPath(path) {
  if (path === HOME_PATH) return "~";

  if (path.startsWith(HOME_PATH + "/")) {
    return "~" + path.replace(HOME_PATH, "");
  }

  return path;
}
