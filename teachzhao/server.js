import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handleApiRequest } from "./lib/api-handlers.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function sendJson(res, payload, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

async function handleApi(req, res) {
  const pathname = (req.url || "").split("?")[0];
  const body = await readBody(req);
  const result = handleApiRequest(req.method || "GET", pathname, body);
  sendJson(res, result.payload, result.status);
}

async function serveStatic(req, res) {
  const cleanUrl = decodeURIComponent((req.url || "/").split("?")[0]);
  const requested = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const candidates = [
    join(__dirname, "public", safePath),
    join(__dirname, safePath)
  ];
  const filePath = candidates.find((path) => existsSync(path)) || join(__dirname, "public", "index.html");
  const ext = extname(filePath);
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

createServer((req, res) => {
  if ((req.url || "").startsWith("/api/")) {
    handleApi(req, res).catch((error) => sendJson(res, { error: error.message }, 500));
    return;
  }
  serveStatic(req, res).catch((error) => {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(error.message);
  });
}).listen(PORT, HOST, () => {
  console.log(`TeachZhao is running at http://${HOST}:${PORT}`);
});
