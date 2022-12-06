
const mongoose = require('mongoose');


// the schema defines the structure of a document or type of document in the database
// the model applies the scgema to a particular model nd use it to interact with the collection of that name
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type: String,
        required : true
    }
}, { timestamps: true } );

module.exports = mongoose.model('Workout' , workoutSchema)

