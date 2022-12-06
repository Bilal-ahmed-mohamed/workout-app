import React from 'react';
import  { useState } from 'react';
import { UseWorkoutContext } from '../hooks/UseWorkoutContext';
import { UseAuthContext } from '../hooks/UseAuthContext'

const  WorkoutForm = () =>  {
    
  const {dispatch} = UseWorkoutContext();
  const {user} = UseAuthContext()
    const [title , settitle] = useState('')
    const [load , setLoad] = useState('')
    const [reps , setReps] = useState('')
    const [error , setError] = useState(null)
    const [emptyFields , setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
          setError('you must be logged in')
          return
        }

        const workout = {title , load , reps}

        const response = await fetch('/api/workouts' , {
            method: "POST" ,
            body: JSON.stringify(workout) ,
            headers: {
                'Content-type' : 'application/json',
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            settitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added');
            dispatch({type: 'CREATE_WORKOUT' , payload:json})
        }
    }
  return (
    <form className="create" onSubmit={handleSubmit} >
        <h3>add a new workout</h3>
        <label > exercise title</label>
        <input
         type="text" 
         onChange={(e) => {
            settitle(e.target.value) 
         
         }}
         value = {title}
         className={emptyFields.includes('title') ? 'error' : ''}
         
         />
         <label > loads (in Kg)</label>
        <input
         type="number" 
         onChange={(e) => {
            setLoad(e.target.value)  
         }}
         value ={load}
         className={emptyFields.includes('load') ? 'error' : ''}
         
         />
         <label > reps:</label>
        <input
         type="number" 
         onChange={(e) => {
           setReps(e.target.value)           
         }}
         value ={reps}
         className={emptyFields.includes('reps') ? 'error' : ''}
         />

         <button>Add workout</button>
         {error && <div className='error'>{error}</div>}
         
    </form>
  )
}

export default WorkoutForm