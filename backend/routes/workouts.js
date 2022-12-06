const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControler')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


 // require auth for all workout routes
// this on  fires before any of the other routes to ensure the user is auhtenctictaed
router.use(requireAuth)

// get all workouts
router.get('/' , getAllWorkouts)


// get a single workout 

router.get('/:id' , getWorkout)


// post a new workout 

router.post('/' , createWorkout )

// delete a workout 
router.delete('/:id' , deleteWorkout)

// update a workout 

router.patch('/:id' , updateWorkout)

module.exports = router