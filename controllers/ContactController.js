
const contactModel=require("../model/contactModel")

const contact = async(req ,res)=>{
  console.log(req.body)
 try{
    const { name, email,message}= req.body;
 
   if(!name ||!email  ){
    return res.status(400).json({message:"All fileds are required"});
   }
   
   const   newcontact= new contactModel(req.body);
     await newcontact.save();
   
     res.status(201).json({message:"contact successfully created"});

   }catch(error){

    console.error("error saving contact:",error.message);
        res.status(500).json({message:"server error"})
   }
   
    };



const getenquiry= async(req, res)=> {
  try{
    const allenquiry=await contactModel.find();
    res.status(200).json(allenquiry);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

module.exports= {contact, getenquiry}
 


