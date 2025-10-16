const express= require('express')
const router=express.Router()
const {category, getcategories,deletecategory, updateCategory}= require('../controllers/categoryController')

router.post('/api/insertcategory',category)
router.get('/api/categories', getcategories)
router.delete('/api/deleteCategory/:id',deletecategory)
router.put('/api/updateCategory/:id',updateCategory)

module.exports= router;