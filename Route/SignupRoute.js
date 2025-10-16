// const express= require('express')
// const router=express.Router()
// const {signup, UserLogin ,changePassword}= require('../controllers/SignupController')


// router.post('/api/insertSignup',signup)
// router.post('/api/insertUserlogin',UserLogin)
// router.put('/api/admin/change-password', changePassword);



// module.exports= router;



// // ('../controllers/Signupcontroller')
const express = require('express');
const router = express.Router();
const { signup, UserLogin, changePassword } = require('../controllers/Signupcontroller');

// Keep route names simple — no `/api` inside router
router.post('/insertSignup', signup);
router.post('/insertUserlogin', UserLogin);
router.put('/change-password', changePassword);

module.exports = router;
