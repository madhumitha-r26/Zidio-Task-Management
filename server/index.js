const express=require('express')
const dotenv=require('dotenv')
const app=express()
const bcrypt = require('bcrypt');
const cors= require('cors')

const DbConnection=require('./DbConnection')
DbConnection()

dotenv.config()
app.use(cors())
app.use(express.json())

const userModel=require('./model/userModel')

// ----------------------------register----------------------------

app.post("/register",async(req,res)=>{
    try{
      const {name,email,password}=req.body
      console.log(name+" "+email+" "+password)
      const existinguser = await userModel.findOne({email})
      console.log(existinguser)
  
      if(existinguser){
        return res.status(400).json({error:"email already exists"})
      }
      const hashed_pwd=await bcrypt.hash(password,10);
      const new_user=new userModel({name,email,password:hashed_pwd})
      const saved_user=await new_user.save()
      res.status(201).json(saved_user)
    }
    catch(error){
      res.status(500).json({error:error.message})
    }
  
  })

app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT - ${process.env.PORT}`)
})