import React, { useState } from 'react';
import './style.css'; // Import your CSS file
import 'boxicons'; // If you have boxicons installed

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="wrapper">
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {isLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
    </div>
  );
};

const Login = ({ toggleForm }) => {
  return (
    <div className="form-box login">
      <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
      <form action="#">
        <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
          <input type="text" required />
          <label>Username</label>
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
          <input type="password" required />
          <label>Password</label>
          <i className='bx bxs-lock-alt'></i>
        </div>
        <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>
        <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
          <p>Don't have an account? <a href="#" onClick={toggleForm} className="register-link">Sign Up</a></p>
        </div>
      </form>
      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
        <p className="animation" style={{ '--i': 1, '--j': 21 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
      </div>
    </div>
  );
};

const Register = ({ toggleForm }) => {
  return (
    <div className="form-box register">
      <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
      <form action="#">
        <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
          <input type="text" required />
          <label>Username</label>
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
          <input type="email" required />
          <label>Email</label>
          <i className='bx bxs-envelope'></i>
        </div>

        <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
          <input type="password" required />
          <label>Password</label>
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>Sign Up</button>
        <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
          <p>Already have an account? <a href="#" onClick={toggleForm} className="login-link">Login</a></p>
        </div>
      </form>
      <div className="info-text register">
        <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome!</h2>
        <p className="animation" style={{ '--i': 18, '--j': 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
      </div>
    </div>
  );
};

export default App;
