const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// setting
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.sendFile("Hello chatting App server");
});

// connection event
io.on("connection", socket => {
  console.log("Connect from Client: " + socket);
  // connection , callback으로는 socket
  socket.on("chat", data => {
    console.log("message from Client: " + data.message);

    var rtnMessage = {
      message: data.message
    };
    // broadcast는 자신을 제외한 나머지 클라이언트에게 메세지 전달
    socket.broadcast.emit("chat", rtnMessage);
  });
});
server.listen(3001, () => {
  console.log("socket io server listening on port 3001");
});