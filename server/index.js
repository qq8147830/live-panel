import express from "express";
import http from "http";
import { Server } from "socket.io";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { handleApiRequest } from "../teachzhao/lib/api-handlers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TZ_PUBLIC = join(__dirname, "../teachzhao/public");

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "1mb" }));

// TeachZhao API
app.all("/teachzhao/api/:endpoint", (req, res) => {
  const pathname = `/api/${req.params.endpoint || ""}`;
  const result = handleApiRequest(req.method, pathname, req.body || {});
  res.status(result.status).json(result.payload);
});

// TeachZhao 静态站点
app.use("/teachzhao", express.static(TZ_PUBLIC));
app.get(/^\/teachzhao\/?$/, (_req, res) => {
  res.sendFile(join(TZ_PUBLIC, "index.html"));
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`[socket.io] connected: ${socket.id}`);

  socket.on("speak", (payload) => {
    try {
      const { text, voiceName } = payload || {};
      if (typeof text !== "string" || !text.trim()) return;

      console.log("[socket.io] speak received:", {
        text: text.slice(0, 60),
        voiceName,
      });

      socket.emit("speak:echo", {
        text,
        voiceName: typeof voiceName === "string" ? voiceName : undefined,
      });
    } catch (err) {
      console.error("[socket.io] speak handler error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`[socket.io] disconnected: ${socket.id}`);
  });
});

const PORT = Number(process.env.PORT || 3001);
server.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`[server] TeachZhao at http://localhost:${PORT}/teachzhao/`);
});
