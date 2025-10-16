//models/Product.js

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title:{type:String,required:true},
   description:{type:String,required:true},
  photo1:{type:String,required:true},
 photo2:{type:String,required:true},
 photo3:{type:String,required:true},
  MRP:{type:String,required:true},
   sellingprice:{type:String,required:true},
    details:{type:String,required:true},
sizes:{type:Array,required:true},
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // This must match the name used in mongoose.model("Category", ...)
    required: true,
  },


  createdAt:{type: Date,default:Date.now},
  
});
const Productmodel = mongoose.model("Product",ProductSchema);

 module.exports= Productmodel;