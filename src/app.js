const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { AuthRoutes } = require("./api/v1/routes/auth.routes");
const { UserRoutes } = require("./api/v1/routes/user.routes");
const { TeamRoutes } = require("./api/v1/routes/team.routes");
const { ProjectRoutes } = require("./api/v1/routes/project.routes");
const { TagRoutes } = require("./api/v1/routes/tag.routes");
const { TaskRoutes } = require("./api/v1/routes/task.routes");
const { RoomRoutes } = require("./api/v1/routes/room.routes");
const { MessageRoutes } = require("./api/v1/routes/message.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-fawn-seven-48.vercel.app",
    ],
    credentials: true,
  })
);
app.use(morgan("common"));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/team", TeamRoutes);
app.use("/api/v1/project", ProjectRoutes);
app.use("/api/v1/tag", TagRoutes);
app.use("/api/v1/task", TaskRoutes);
app.use("/api/v1/room", RoomRoutes);
app.use("/api/v1/message", MessageRoutes);

module.exports = app;
