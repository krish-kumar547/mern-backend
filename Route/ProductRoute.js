const express= require('express')
const router=express.Router()
const {product, getproduct,deleteproduct,updateproduct,getproductbyid,getproductbycategory}= require('../controllers/productcontroller')

router.post('/api/insertproduct',product)
router.get('/api/products', getproduct)
router.delete('/api/deleteproduct/:id',deleteproduct)
router.put('/api/updateproduct/:id',updateproduct)
router.get('/api/products/:id', getproductbyid)
router.get('/api/productbycategory/:id', getproductbycategory)

module.exports= router;



