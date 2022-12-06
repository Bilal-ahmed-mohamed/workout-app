import React from 'react'
import {Link} from 'react-router-dom';
import { UseLogout } from '../hooks/UseLogout';
import {UseAuthContext} from  '../hooks/UseAuthContext'
function Navbar() {
  const {logout} = UseLogout()
  const {user} = UseAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header className='navbar'>
        <div className="container">
            
                <Link to={'/'}>
                    <h1>workout tracker app</h1>
                </Link>
                <nav>
                { user && (  <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>logout</button>
                  </div>
                )}
               { !user &&   ( <div>
                    <Link to="/Login" >Login </Link>
                    <Link to="/SignUp"> SignUp </Link>
                  </div>
               )}
                </nav>
        </div>
    
    </header>
  )
}

export default Navbar