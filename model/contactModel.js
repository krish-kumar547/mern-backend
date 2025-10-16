// models/contactmodel.js

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  message:{type:String},
  createdAt:{type: Date,default:Date.now},
  
});
const contactModel = mongoose.model("contact",contactSchema);

 module.exports= contactModel;