 const { mongoose ,Schema ,model } = require("mongoose");
 
  mongoose.connect("mongodb+srv://ankitrai:213087aA@cluster0.zla1tp0.mongodb.net/paytmApp")

        
 const userSchema = new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
            
        },
        password:{
          type:String,
          required:true,
          minLength:true
        },
      firstName:  {
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            minLength:true,
            maxLength:20
            
        },
       lastName: {
       type:String,
            required:true,
            trim:true,
            lowercase:true,
            minLength:true
            
        }
})
   const bankSchema = new Schema({
      userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      balance:{
        type:Number,
        required:true
      }
   })

  const User= model("User",userSchema);
  const Account = model("Account",bankSchema);

  module.exports={
        User,
        Account
  }