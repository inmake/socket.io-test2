import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "*" });
const port = 3000;

app.use(cors());

app.get("/", function (req, res) {
  res.json({ ok: 1 });
});

const users = [];

io.on("connection", async (socket) => {
  if (!users.some((user) => user.id === socket.id)) {
    users.push({ id: socket.id, x: 0, y: 0 });
  }

  socket.on("update", (updatedUser) => {
    console.log("updatedUser", updatedUser);

    users.forEach((user, index) => {
      if (user.id === updatedUser.id) {
        users[index] = updatedUser;
      }
    });

    io.volatile.emit("update", users);
  });

  socket.on("disconnect", () => {
    // users = users.filter((user) => user.id !== socket.id);
    users.forEach((user, index) => {
      if (user.id === socket.id) {
        users.splice(index, 1);
      }
    });
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
