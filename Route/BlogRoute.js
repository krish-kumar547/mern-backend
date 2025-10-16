const express= require('express')
const router=express.Router()
const {Blog, getBlog,deleteBlog, updateBlog,getBlogCount}= require('../controllers/Blogcontroller')

router.post('/api/insertBlog',Blog)
router.get('/api/Blog', getBlog)
router.delete('/api/deleteBlog/:id',deleteBlog)
router.put('/api/updateBlog/:id',updateBlog)


module.exports= router;