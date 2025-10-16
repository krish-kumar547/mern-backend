const Blogmodel=require('../model/Blogmodel')
const categorymodel=require('../model/Categorymodel')
const contactModel=require("../model/contactModel")

const getCount=async(req, res)=>{
    try{
    const [blogcount, categorycount, contactcount]=await Promise.all([
        Blogmodel.countDocuments(),
        categorymodel.countDocuments(),
        contactModel.countDocuments()
    ]);
    res.status(200).json({
        blogcount, categorycount,contactcount
    })
    }
    catch(err)
    {
console.log(err)
res.status(500).json({message:"Error"})
    }
}

module.exports= getCount;
