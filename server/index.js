const express=require('express')
const dotenv=require('dotenv')

const userRouter=require('./routers/userRouter.js')
const DbConnection=require('./DbConnection')

DbConnection()

const app=express()
const port=8081

dotenv.config()

app.use(express.json())
app.use("/users",userRouter)

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON PORT - ${port}`)
})