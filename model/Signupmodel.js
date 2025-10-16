// models/Signupmodel.js

const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  createdAt:{type: Date,default:Date.now},
  
});
const Signupmodel = mongoose.model("Signup",SignupSchema);

 module.exports= Signupmodel;