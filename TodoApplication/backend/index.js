const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const userroute = require("./routes/user");
const dataroute = require("./routes/Data");
require("dotenv").config();
const Notification = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/user", userroute);
app.use("/user/Search", dataroute);

const server = http.createServer(app);


const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Developer connected");

  socket.on("sendNotification", async ({ developerId, clientEmail, projectDetails }) => {
    try {
      const notification = new Notification({ developerId, clientEmail, projectDetails });
      await notification.save();
      io.emit(`notification-${developerId}`, notification);
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Developer disconnected");
  });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
