// models/blogmodel.js


const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title:{type:String,required:true},
  photo:{type:String,required:true},
  details:{type:String,required:true},
  category:{type:String,required:true},
 description:{type:String,required:true},

  
  createdAt:{type: Date,default:Date.now},
  
});
const Blogmodel = mongoose.model("Blog",BlogSchema);

 module.exports= Blogmodel;