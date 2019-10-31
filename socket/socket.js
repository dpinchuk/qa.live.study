const socket_io = require("socket.io");
let io = socket_io();
const User = require("../models/User");

const changeStream = User.watch();

changeStream.on("change", change => {
  console.log(change); // You could parse out the needed info and send only that data.
  io.emit("changeData", change);
});

io.on("connection", function() {
  console.log("connected");
});

let socket = io;
module.exports = socket;
