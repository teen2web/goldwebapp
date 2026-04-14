import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.resolve(__dirname, "..", "dist");
const targetDir = path.resolve(__dirname, "..", "..", "backend", "static", "frontend");

if (!existsSync(sourceDir)) {
  throw new Error("Frontend dist folder not found. Run vite build first.");
}

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}

mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });
