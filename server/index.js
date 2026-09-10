const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const DbConnection = require("./DbConnection");

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Zidio Task Management");
});

app.use(async (req, res, next) => {
  try {
    await DbConnection();
    next();
  } catch (error) {
    res.status(503).json({ error: "Database unavailable" });
  }
});


const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

app.use("/users", userRouter);
app.use("/tasks", taskRouter);



const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT - ${PORT}`);
  });
}

module.exports = app;
