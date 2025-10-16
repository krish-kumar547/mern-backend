

const footerModel=require("../model/footerModel")

const footer = async(req ,res)=>{
  console.log(req.body)
 try{
    const { email}= req.body;
 
   if( !email  ){
    return res.status(400).json({message:"All fileds are required"});
   }
   
   const   newfooter= new footerModel(req.body);
     await newfooter.save();
   
     res.status(201).json({message:"email successfully created"});

   }catch(error){

    console.error("error saving footer:",error.message);
        res.status(500).json({message:"server error"})
   }
   
    }


const subscription=async (req,res)=>{

  try{
    const subscibe=await footerModel.find();
    res.status(200).json(subscibe)
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err.message})
  }
}

module.exports= {footer,subscription}