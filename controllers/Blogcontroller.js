const Blogmodel=require('../model/Blogmodel')

const Blog = async(req ,res)=>{
  console.log(req.body)
 try{
    const { title,description, photo,details,category}= req.body;
 
   if(!title ||!photo ||!category ||!details ||!description     ){
    console.log("required");
    return res.status(400).json({message:"All fileds are required"});
    
   }
   
   const   newcat= new Blogmodel(req.body);
     await newcat.save();
   
     res.status(201).json({message:" successfully created"});

   }catch(error){

    console.error("error saving contact:",error.message);
        res.status(500).json({message:"server error"})
   }
   
    };




const getBlog= async(req, res)=> {
  try{
    const allcates=await Blogmodel.find();
    res.status(200).json(allcates);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

const deleteBlog=async(req, res)=>{
  const {id}= req.params;
  try{
  const deleted=await Blogmodel.findByIdAndDelete(id)

   if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  }
  catch(err)
  {
    console.error("Error deleting Blog:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, photo } = req.body;

  try {
    const updated = await Blogmodel.findByIdAndUpdate(
      id,
      { title, photo },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Blog updated successfully",Blog : updated });
  } catch (err) {
    console.error("Error updating category:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}; 


// const Blogmodel =async (req, res) => {
//   try {
//     const count = await Blogmodel.countDocuments(); // count all blogs
//     res.status(200).json({ totalBlogs: count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getBlogCount = async (req, res) => {
//   try {
//     const count = await Blogmodel.countDocuments();
//     res.status(200).json({ totalBlogs: count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



module.exports= {Blog,getBlog, deleteBlog,updateBlog,Blogmodel}
 