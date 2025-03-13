const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser=require("cookie-parser")

const DbConnection = require("./DbConnection");
DbConnection();

dotenv.config();

app.use(cors({
  origin: "https://zidio-task-management-two.vercel.app",  // Allow frontend URL
  credentials: true,  // Allow credentials (cookies, sessions, etc.)
  methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allow headers
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://zidio-task-management-two.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://zidio-task-management-two.vercel.app");
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

app.get('/',(req,res)=>{
  res.status(200).json({message:"Zidio Task Management"})
})

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT - ${process.env.PORT}`);
});
