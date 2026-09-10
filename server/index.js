const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const DbConnection = require("./DbConnection");
DbConnection();

dotenv.config();

const app = express();


app.use(cors({
  origin: ["https://zidio-task-management-two.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(cookieParser());
app.use(express.json());

const userRouter = require("./router/userRouter");
const taskRouter = require("./router/taskRouter");

app.use("/users", userRouter);
app.use("/tasks", taskRouter);


app.get('/', (req, res) => {
  res.send("Zidio Task Management")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT - ${PORT}`);
});
