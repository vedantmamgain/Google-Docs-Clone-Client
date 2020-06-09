const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Initial config

//Listen server

//Socket Events
io.on("connection", (socket) => {
  //Connect
  console.log(`${socket.id} was connected`);

  //send data
  socket.on("send", (data) => {
    emitTo(data);
  });

  function emitTo(data) {
    socket.broadcast.emit("update", data);
  }

  //Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} was disconnected`);
  });
});

//Live Update package
server.listen(8000, function () {
  console.log("Server listening on port 8000");
});
