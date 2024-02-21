import React, { useState } from 'react';
import './App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Register from './components/Register';
import SignIn from './components/SignIn';
import GeneratePdf from './components/GeneratePdf';

function App() {
  const [isActived, setIsActived] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  // Le composant à afficher en fonction de l'état isLogin
  if (isLogin) {
    <SignIn />;
  } else {
    <Register />;
  }
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };
  const handleCon = () => {
    setIsActived((prevState) => !prevState)
  }

  return (
    <div className="">
      <div className="counGen d-flex">
        <GeneratePdf/>
        <div className="account" onClick={handleCon}>
          <AccountCircleIcon/>
        </div>
      </div>
      {
        isActived &&
        (
          <div>
            <button onClick={toggleLogin}>
                {isLogin ? 'SignUp' : 'SignIn'}
            </button>
            {
              isLogin? <SignIn/>:<Register/>
            }
          </div>
        )
      }
    </div>
  );
}

export default App;
