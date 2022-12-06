import { UseAuthContext } from "./UseAuthContext"
import {UseWorkoutContext} from './UseWorkoutContext'


export const UseLogout = () => {

    const {dispatch} = UseAuthContext()
    const {dispatch : workoutsDispatch} = UseWorkoutContext()
  
    const logout = () => {
        // remove use from sttorage 
         localStorage.removeItem('user')

        //  dispatch log out action 
        dispatch({type:'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS' , payload:null})
    }

    return {logout}
}