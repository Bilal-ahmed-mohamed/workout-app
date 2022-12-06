import React, { useState } from 'react'
import {UseSignup} from '../hooks/UseSignup'

const Signup=()=>{
    const [email ,setEmail]=useState('')
    const [password ,setPassword]=useState('')
    const{signup ,error , isLoading }= UseSignup()

    const handelSubmit = async (e)=>{
        e.preventDefault()


        await signup(email, password)
        console.log(email,password);

    }


  return (
    <form className='signup' onSubmit={handelSubmit} >
        <h3>SignUp</h3>
        <label >Email</label>
        <input type="email" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}

        />

        <label >Password</label>
        <input type="Password" 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        
        />
{/* the reason  as to why i have disabled the btn is beacause when a client is submiting the  form he/she might accidentaly submit multipale time */}
        <button disabled={isLoading}> Signup</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup