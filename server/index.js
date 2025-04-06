import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => socket.send(`${JSON.stringify(msg)}`));
});

httpServer.listen(4000, () => {
  console.log("🚀 Socket.IO server running on http://localhost:4000");
});
