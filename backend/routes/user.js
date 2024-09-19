 const express = require("express");
 const {JWT_SECRET}= require('../config.js');
 const zod= require('zod');
  const {User,Account}   = require('../db.js');
  const jwt = require('jsonwebtoken')
  const {authMiddleware} = require("../middleware.js")
  
 const router = express.Router()
 const app =express();
 app.use(express.json());
 
 const signupSchema = zod.object({
        username:zod.string().email(),
        password:zod.string(),
        firstName:zod.string(),
        lastName :zod.string()

 })

 

  router.post('/signup', async (req,res)=>{
    
      const body= req.body;
      console.log(req.body);
      const {success}= signupSchema.safeParse(req.body);
      console.log(success);
      if(!success){
       return  res.status(411).json({
        message:"Email already taken / Incorrect inputs"
       })
      }
      const existingUser=await User.findOne({
        username:body.username
      })
      if(existingUser){
        return res.json({
             message:"Email already taken / Incorrect inputs"   
        })
      }
      const user= await User.create(body);

      const userId=user._id

      await Account.create({
        userId,
        balance: 1+ Math.random()*10000

      })

      const token= jwt.sign({
        userId
      },JWT_SECRET);

      res.json({
        message:"User created successfully",
        token:token
      })
  })
  const signinSchema =zod.object({
    username:zod.string().email(),
    password:zod.string()
})

  router.post('/signin', async (req,res)=>{
     const body= req.body;
     const {success}= signinSchema.safeParse(body);

     if(!success){
     return  res.status(411).json({
      message:"Please enter valid credential"
     })
     }
     const userExist= await User.findOne({
      username:body.username,
      password:body.password
     })

     if(userExist){
      const userId=userExist._id;
      const token= jwt.sign({
        userId
      },JWT_SECRET);

      res.json({
        message:"User logged in successfully",
        token:token
      })
      return;

     }

     res.status(411).json({
      message:"Error while loggin in"
     })

  })
  const updatedSchema=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().min(6).optional()
  })
  router.put("/", authMiddleware, async (req,res)=>{
     const body=req.body;
     const {success}= updatedSchema.safeParse(body);
     if(!success){
      return res.status(404).json({
        message:"Error while updating information"
      })
     }
     await User.updateOne({_id:req.userId},req.body);

     res.json({
      message:" Data Updated sccessfully"
     })
  })

  router.get("/bulk", async (req,res)=>{
        const filter = req.query.filter || "";

       const users= await User.find({
          $or :[{
            firstName :{
              "$regex":filter
              
            }
          },{
              lastName:{
                "$regex":filter
              }
            }
          ]
        })
        res.json({
          user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id

          })
        )
        })
  })
 module.exports=router;