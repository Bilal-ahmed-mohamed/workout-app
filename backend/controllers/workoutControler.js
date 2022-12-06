const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');


// get all workouts
const getAllWorkouts = async (req,res) => {

    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1}) 
    res.status(200).json(workouts)
}
// get a single workout 
const getWorkout = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:'No such Workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return  res.status(404).json({error: "no such workout"})
    }
    res.status(200).json(workout)

}
// post a new workout 

const createWorkout = async (req,res) => {
    const {title,reps,load} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
      }
 
    // add a workout to the db
    try {
        const user_id = req.user._id
        const workout = await  Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// delete a workout 

const deleteWorkout = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Workout'})
     }

     const workout = await Workout.findByIdAndDelete({_id: id})
     if (!workout) {
        return  res.status(400).json({error: "no such workout"})
    }
    res.status(200).json(workout)



}
// update a workout

const updateWorkout = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Workout'})
     }

     const update = await Workout.findByIdAndUpdate({_id:id} , {
        ...req.body
     } )
     if (!update) {
        return  res.status(400).json({error: "no such workout"})
    }
    res.status(200).json(update)

}



module.exports  = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}