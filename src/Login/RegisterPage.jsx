// RegisterPage.js
import React, { useState } from 'react';
import './style.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.31.48:8086/api/auth/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                // Handle successful registration (redirect to login, etc.)
            } else {
                setError(data.message); // Handle registration failure
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('An error occurred. Please try again.');
        }
    };

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
                    {/* <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
                        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="login-link">Login</a></p>
                    </div> */}
                </form>
                <div className="info-text register">
                    <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome!</h2>
                    <p className="animation" style={{ '--i': 18, '--j': 1 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
                </div>
            </div>
        );
};

export default RegisterPage;
