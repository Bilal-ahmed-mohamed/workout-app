import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {UseAuthContext} from './hooks/UseAuthContext'

function App() {
  const {user} = UseAuthContext();

  return (
    <div className="App">

      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
        <Route 
         path='/'
         element={ user ?  <Home/> : <Navigate to= '/Login' />}
        />
        <Route 
        path='/Login'
        element={ !user ?  <Login/> : <Navigate to='/' /> }
        />
        <Route 
        path='/SignUp'
        element={!user ?  <SignUp/> : <Navigate to='/' />}
        />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
