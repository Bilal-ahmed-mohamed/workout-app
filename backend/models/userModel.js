const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password: {
        type: String,
        required: true
    }
})

//  static signup method 
userSchema.statics.signup = async function(email , password)  {

    // valiadtion
    if(!email || !password){
        throw Error('all fields must be filled')
    }
    // email validating 
    if (!validator.isEmail(email)) {
        throw Error('email is not valid')
    }
    // password validating 
    if (!validator.isStrongPassword(password)) {
        throw Error('password must be atleats 8 characters & start with a CAPS and have a special character')
    }
   
    const Exists = await this.findOne({email})
    if (Exists) {
        throw Error('email already in use')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email , password: hash})

    return user;
}

//  static login method 
userSchema.statics.login = async function (email , password){
       // valiadtion
       if(!email || !password){
        throw Error('all fields must be filled')
    }
  
    const user = await this.findOne({email})
    if (!user) {
        throw Error('Incorrect email')
    }
    
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user




}
module.exports = mongoose.model('User' , userSchema)