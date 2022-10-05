const app = require("express")();
const EncryptRsa = require("encrypt-rsa").default;

const server = require("http").createServer(app);
const port = 5000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const mySecretKey = "PujaK";

io.on("connection", (socket) => {
  io.emit("get_secretKey", mySecretKey);

  socket.on("PersonB", (payload) => {
    io.emit("PersonB", payload);
  });

  socket.on("PersonA", (payload) => {
    io.emit("PersonA", payload);
  });
});

server.listen(port, () => {
  console.log("server listening at port 5000");
});
