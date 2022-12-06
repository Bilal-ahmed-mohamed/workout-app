import React from 'react'
import  { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { UseWorkoutContext } from '../hooks/UseWorkoutContext';
import {UseAuthContext} from '../hooks/UseAuthContext'

const Home = ()  => {
   const {workouts,dispatch} =  UseWorkoutContext()
   const {user} = UseAuthContext()
    
// const [workouts , setWorkouts] = useState(null);
useEffect(() => {
 
    const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization'  : `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        console.log(json);

        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
          }

    }
    if (user) {
      fetchWorkouts();
    }
    
} , [dispatch,user])
  return (
    <div className="home">
    <div className="workouts">
        {workouts && workouts.map((workout) => (
           <WorkoutDetails key={workout._id} workout={workout} />
        ))}

        <WorkoutForm/>
    </div>
    </div>
  )
}

export default Home