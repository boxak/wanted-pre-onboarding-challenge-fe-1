import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './view/Login';
import SignUp from './view/SignUp';
import Todo from './view/Todo';
import NullChecker from './util/NullChecker';
import { useState } from 'react';


function getToken() {
  const token = localStorage.getItem('token');
  return NullChecker.fixNullString(token);
}

function App() {

  const [tokenString, setTokenString] = useState(getToken());

  const setToken = (token) => {
    localStorage.setItem('token', token);
    setTokenString(token);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setTokenString(undefined);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" render={() => <Login setToken={setToken} />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/" element={!NullChecker.isEmpty(tokenString) ? <Todo logout={logout}/> : <Login setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
