require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Socket.io
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// Socket logic
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });
});

// Routes (we'll add below)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/saved-searches", require("./routes/savedSearchRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/disputes", require("./routes/disputeRoutes"));
app.use("/api/offers", require("./routes/offerRoutes"));
app.use("/api/listing-stats", require("./routes/listingStatsRoutes"));
app.use("/api/rent-requests", require("./routes/rentRequestRoutes"));
app.use("/api/listing-expiry", require("./routes/listingExpiryRoutes"));
app.use("/api/trust", require("./routes/trustRoutes"));
app.get("/", (req, res) => {
  res.send("Tuffly Backend Running");
});
server.listen(5000, () => console.log("Server running on port 5000"));