// whenerver i need to use the workoutcontext i just invoke this hook 

import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const UseWorkoutContext = () => {
    // this hook returns to us the value of the WorkoutContext 
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useworkoutcontext must be used inside a workoutcontetxprovider ')
    }

    return context
}