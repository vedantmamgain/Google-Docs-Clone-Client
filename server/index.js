const express = require("express");
const app = express();
const expressServer = require("http").createServer(app);
const io = require("socket.io")(expressServer);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const documentRoute = require("./routes/documentRoute");

//Initial config

//Setting up cors and passsing the options to allow cross browser commumication
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(morgan("dev")); //console logs all of the REST requests with time
app.use(express.json());
app.use("/api/v1/docu/", documentRoute);

//Setting up socketio for real time collabration
io.on("connection", (socket) => {
  console.log(`${socket.id} was connected`);
  //as soon as join event is recieved we enter this block of code
  socket.on("join", (room) => {
    //Joining a unique room for every unique document to allow mutiple users to work on multiple documents at the same time
    socket.join(room);

    socket.on("send", (data) => {
      emitTo(data);
    });

    function emitTo(data) {
      //Sending the dara from our server to other user's front end
      socket.broadcast.to(room).emit("update", data);
    }
  });

  //Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} was disconnected`);
  });
});
//Our dotenv file consists of configuration for our project
dotenv.config({ path: "./config.env" });

//Connecting with our local mongodb database
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Datbase Connected"));

const port = process.env.port || 8000;

expressServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
