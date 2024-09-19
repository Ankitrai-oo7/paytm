 const express = require('express');
 const JWT_SECRET =require('../config.js')
 const jwt = require("jsonwebtoken");
 const {Account } =  require("../db.js");
const { authMiddleware } = require('../middleware.js');
const { default: mongoose } = require('mongoose');
  const router = express.Router();

  console.log("h");
  router.get('/balance',authMiddleware, async (req,res)=>{
     console.log("hi");
     console.log(req.userId);
     const account= await Account.findOne({
        userId : req.userId
      })
      console.log(account)
      res.json({
        balance:account.balance
      })
  });

  router.post("/transfer", authMiddleware,async (req,res)=>{
     const session = await mongoose.startSession();

     session.startTransaction();
      const {amount , to} = req.body;
// Fetch the accounts within the transaction
      const account = await Account.findOne({
        userId : req.userId
      }).session(session);

      if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(411).json({
          message :"Insufficient balance"
        })
      }
  
      const toAccount = await Account.findOne({
        userId:to
      }).session(session)

      if(!toAccount){
        await session.abortTransaction()
        return res.status(411).json({
          message:"Invalid account"
        })
      } 
// Perform the transfer
      await Account.updateOne({userId:req.userId},$inc={ balance :account.balance-amount}).session(session);
     await Account.updateOne({userId:to},$inc={balance:toAccount.balance+parseInt(amount)}).session(session);
 // commit the transaction

  await session.commitTransaction();
  res.status(200).json({
    message:"Transaction successful"
  })

  });

  module.exports=router;
        
  