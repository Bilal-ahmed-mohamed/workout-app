const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const  createToken = (_id) =>  {
    
   return  jwt.sign({_id} , process.env.SECRET, {expiresIn:'3d'})
}
// login user
const LoginUser = async (req,res) => {

    const {email , password } = req.body 
    try {
        const user = await User.login(email,password)

          // create a token 
          const token = createToken(user._id)


        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({err: error.message})
    }
    


} 

// signUp user
const SignUpUser = async (req,res) => {

    const {email , password} = req.body 

    let emptyFields = []
    if (!email) {
        emptyFields.push('email')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error : "Please Fill All The Details"})
    }
    try {
        const user = await User.signup(email,password)

          // create a token 
          const token = createToken(user._id)


        res.status(200).json({name,email,user})

    } catch (error) {
        res.status(400).json({err: error.message})
    }
    
}

module.exports = {LoginUser , SignUpUser}