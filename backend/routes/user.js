const express = require('express')
const User = require('../models/userModel')
// controller functions 
const {LoginUser , SignUpUser} = require('../controllers/userControler')


const router = express.Router();

// login route 
router.post('/Login', LoginUser)

// signup route

router.post('/SignUp' , SignUpUser )


module.exports = router