const express= require('express')
const router=express.Router()
const {footer, subscription}= require('../controllers/footercontroller')


router.post('/api/insertsubscribe',footer)
router.get('/api/subscription',subscription)
module.exports= router;