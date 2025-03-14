const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DbConnection = require("./DbConnection");
DbConnection();

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://zidio-task-management-two.vercel.app",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://zidio-task-management-two.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://zidio-task-management-two.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json());

const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({ message: "Zidio Task Management" });
});

module.exports = app;