const express= require('express')
const router=express.Router()
const {placeorder,updatepayment,myorders,orderdetails, allorders,adminorderdetails,updateorderstatus}= require('../controllers/Ordercontroller')

router.post('/api/placeorder',placeorder)
router.put('/api/updatepayment/:orderId', updatepayment)
router.get('/api/myorders/:userId',myorders)
router.get('/api/orderdetails/:orderId',orderdetails)
router.get('/api/allorders',allorders)
router.get('/api/adminorderdetails/:orderId',adminorderdetails)
router.put('/api/updateorderstatus/:orderId',updateorderstatus)


module.exports= router;



