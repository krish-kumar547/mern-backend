const express= require('express')
const router=express.Router()
const {contact, getenquiry}= require('../controllers/ContactController')

router.post('/api/insertcontact',contact)
router.get('/api/enquiries',getenquiry)

module.exports= router;