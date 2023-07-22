import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import UserLayout from './layout/UserLayout';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignIn />}/>
          <Route path = "/register" element = {<SignUp />}/>
          <Route path = "/user" element = {<UserLayout />} >
            <Route index element = {<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
