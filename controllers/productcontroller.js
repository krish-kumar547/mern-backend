const productmodel=require('../model/productmodel')

const product= async(req ,res)=>{
  console.log(req.body)
 try{
    const { title, photo1,photo2,photo3}= req.body;
 
   if(!title ||!photo1 ||!photo2 ||!photo3  ){
    return res.status(400).json({message:"All fileds are required"});
   }
   
   const   newcat= new productmodel(req.body);
     await newcat.save();
   
     res.status(201).json({message:" successfully created"});

   }catch(error){

    console.error("error saving contact:",error.message);
        res.status(500).json({message:"server error"})
   }
   
    };

const getproduct= async(req, res)=> {
  try{
    const allcates=await productmodel.find().populate('category');
    res.status(200).json(allcates);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
};


const deleteproduct=async(req, res)=>{
  const {id}= req.params;
  try{
  const deleted=await productmodel.findByIdAndDelete(id)

   if (!deleted) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product deleted successfully" });
  }
  catch(err)
  {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateproduct=async(req,res)=>{


const { id } = req.params;

  try {
    const updated = await productmodel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product updated successfully", product: updated });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getproductbyid=async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const product = await productmodel.findById(id).populate("category"); // populate category if it's a ref

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const getproductbycategory=async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productmodel.find({category:id}).populate("category"); // populate category if it's a ref

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports= {product,getproduct,deleteproduct,updateproduct, getproductbyid, getproductbycategory}
 


