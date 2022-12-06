import React from 'react'
import { UseWorkoutContext } from '../hooks/UseWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {UseAuthContext} from '../hooks/UseAuthContext'

const   workoutDetails = ({workout}) =>  {
  
  const {dispatch} = UseWorkoutContext();
  const {user} = UseAuthContext()
  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/workouts/' + workout._id , {
      method: 'DELETE',
      headers: {
        'Authorization'  : `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type:'DELETE_WORKOUT' , payload:json})
    }
  }
   
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>load in (kg):</strong> {workout.load} </p>
        <p><strong>reps:</strong> {workout.reps} </p>
        <p>{formatDistanceToNow(new Date(workout.createdAt) , {addSuffix: true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick} >Delete</span>
    </div>
  )
}

export default workoutDetails