
// models/Categorymodel.js

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title:{type:String,required:true},
  photo:{type:String,required:true},
  createdAt:{type: Date,default:Date.now},
  
});
const Categorymodel = mongoose.model("Category",categorySchema);

 module.exports= Categorymodel;