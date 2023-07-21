import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import { useState } from 'react';

function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  function goToSignUp() {
    setIsSignIn(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignIn />}/>
          <Route path = "/register" element = {<SignUp />}/>
        </Routes>
      </BrowserRouter>
      {/* {
        isSignIn ? <SignIn /> : <SignUp />
      }
      {
        isSignIn ? <p> Don't have an account? <span onClick={goToSignUp}>SIGN UP</span></p> : <a href='/'>Back</a>
      } */}
    </div>
  );
}

export default App;
