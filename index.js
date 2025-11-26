const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);

  socket.on("hall", (payload) => {
    console.log("got hall from some client:", payload);

    // 這邊先寫死抓到這邊的資料，發送到所有連線的客戶端
    io.emit("hall", payload);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket server running at http://127.0.0.1:${PORT}`);
});
