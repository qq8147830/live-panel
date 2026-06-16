import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function run(name, script) {
  const child = spawn("npm", ["run", script], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  child.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[dev:all] ${name} exited with code ${code}`);
      process.exit(code);
    }
  });
  return child;
}

console.log("[dev:all] Starting Socket.IO server + Vite (TeachZhao /ai-agency/ + AI Agency API 需另开: npm run dev:ai-agency)");
run("server", "server");
run("vite", "dev");

process.on("SIGINT", () => process.exit(0));
