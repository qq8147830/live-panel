import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// 允许跨域：本地开发阶段便于前端直连
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`[socket.io] connected: ${socket.id}`);

  // speak 事件：接收 { text, voiceName }
  // 当前阶段：为了统一接口，后端仅 echo 给前端用于测试；
  // 之后再接入 say.js / AI 决策时，可以在这里扩展。
  socket.on("speak", (payload) => {
    try {
      const { text, voiceName } = payload || {};
      if (typeof text !== "string" || !text.trim()) return;

      console.log("[socket.io] speak received:", {
        text: text.slice(0, 60),
        voiceName,
      });

      // echo 返回给前端
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
});

