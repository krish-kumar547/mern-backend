const express= require('express')
const router=express.Router()
const getCount= require('../controllers/DashboardController')

router.get('/api/getCount', getCount)

module.exports= router;