import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignIn />}/>
          <Route path = "/register" element = {<SignUp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
