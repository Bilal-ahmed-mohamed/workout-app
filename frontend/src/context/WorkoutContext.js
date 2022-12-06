import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();


// the argument inside a dispatch function is known as an action
// action is an object that has a type property and a payload 
export const workoutsReducer = (state , action) => {
   switch (action.type) {
    case 'SET_WORKOUTS':
        return {
            workouts: action.payload
        }
       
        case 'CREATE_WORKOUT': 
            return {
                workouts: [action.payload, ...state.workouts]
            }

            case 'DELETE_WORKOUT':
                return{
                    workouts:state.workouts.filter((w) => w._id !== action.payload._id)
                }
            
   
    default:
        return state
   }
}


// provide the context to our application component tree 
// the children prop represent whatever components or templates this component that accepts the props wraps 
export const WorkoutsContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(workoutsReducer , {
        workouts: null
    })


// we are returning a template below 
// when outputting the children inside the provider component we are outputting the root app component 
    return (
        <WorkoutContext.Provider value={{...state , dispatch}} >
            {children}
        </WorkoutContext.Provider>
    )
}