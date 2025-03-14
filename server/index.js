const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const DbConnection = require("./DbConnection");
DbConnection();

const app = express();

app.use(cors({
  origin: "https://zidio-task-management-two.vercel.app",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(cookieParser());

const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Zidio Task Management" });
});


// app.listen(process.env.PORT, () => {
//   console.log(`SERVER IS RUNNING ON PORT - ${process.env.PORT}`);
// });

// Instead of app.listen, export the app as a handler
module.exports = app;
