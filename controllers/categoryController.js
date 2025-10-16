
const categorymodel=require('../model/Categorymodel')

const category = async(req ,res)=>{
  console.log(req.body)
 try{
    const { title, photo}= req.body;
 
   if(!title ||!photo  ){
    return res.status(400).json({message:"All fileds are required"});
   }
   
   const   newcat= new categorymodel(req.body);
     await newcat.save();
   
     res.status(201).json({message:" successfully created"});

   }catch(error){

    console.error("error saving contact:",error.message);
        res.status(500).json({message:"server error"})
   }
   
    };

const getcategories= async(req, res)=> {
  try{
    const allcates=await categorymodel.find();
    res.status(200).json(allcates);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

const deletecategory=async(req, res)=>{
  const {id}= req.params;
  try{
  const deleted=await categorymodel.findByIdAndDelete(id)

   if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  }
  catch(err)
  {
    console.error("Error deleting category:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, photo } = req.body;

  try {
    const updated = await categorymodel.findByIdAndUpdate(
      id,
      { title, photo },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category: updated });
  } catch (err) {
    console.error("Error updating category:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports= {category,getcategories, deletecategory,updateCategory}
 


