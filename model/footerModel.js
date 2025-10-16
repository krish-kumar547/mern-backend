// models/footermodel.js

const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  email:{type:String,required:true},

  createdAt:{type: Date,default:Date.now},
  
});
const footerModel = mongoose.model("footer",footerSchema);

 module.exports= footerModel;