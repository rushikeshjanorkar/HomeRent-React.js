// import React, { useState } from 'react';
// import './style.css';

// const AuthPage = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const toggleForm = () => {
//         setIsLogin(!isLogin);
//         setError(''); // Clear error when switching forms
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://http://192.168.31.48:8086/api/auth/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();
//             console.log(data);
//             if (response.ok) {
//                 alert(data.message);
//                 // Handle successful login (store user data, redirect, etc.)
//             } else {
//                 setError(data.message); // Handle login failure
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="wrapper">
//             <span className="rotate-bg"></span>
//             <span className="rotate-bg2"></span>

//             {isLogin ? (
//                 <LoginForm
//                     toggleForm={toggleForm}
//                     handleLogin={handleLogin}
//                     username={username}
//                     setUsername={setUsername}
//                     password={password}
//                     setPassword={setPassword}
//                     error={error}
//                 />
//             ) : (
//                 <RegisterForm toggleForm={toggleForm} />
//             )}
//         </div>
//     );
// };

// const LoginForm = ({ toggleForm, handleLogin, username, setUsername, password, setPassword, error }) => {
//     return (
//         <div className="form-box login">
//             <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
//                     <input
//                         type="text"
//                         required
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <label>Username</label>
//                     <i className='bx bxs-user'></i>
//                 </div>

//                 <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
//                     <input
//                         type="password"
//                         required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <label>Password</label>
//                     <i className='bx bxs-lock-alt'></i>
//                 </div>
//                 <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>
//                 {error && <p className="error">{error}</p>}
//                 <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
//                     <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="register-link">Sign Up</a></p>
//                 </div>
//             </form>
//             <div className="info-text login">
//                 <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
//                 <p className="animation" style={{ '--i': 0, '--j': 20, paddingLeft: "100px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
//             </div>
//         </div>
//     );
// };


// export default AuthPage;


// AuthPage.js
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom'; // Import Link
import './style.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // Now you can access properties within storedUserData, for example:
    //console.log(storedUserData.token); // If there's a token property



    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(''); // Clear error when switching forms
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const primaryUrl = 'http://192.168.31.48:8085/api/auth/admin/login';
        const fallbackUrl = 'http://192.168.31.48:8085/api/auth/login';
    
        try {
            // Attempt to login with the primary URL
            let response = await fetch(primaryUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.status === 401) {
                throw new Error('Unauthorized: Attempting fallback URL'); // Trigger fallback URL attempt
            }
    
            const data = await response.json();
            console.log("Admin login successful:", data);
    
            // If login is successful with primary URL
            alert("Admin Login successful !!!! ");
            navigate('/monthly-bill');
            localStorage.setItem('userData', JSON.stringify(data));
    
        } catch (primaryError) {
            console.warn("Primary login failed, trying fallback URL:", primaryError);
    
            try {
                // Attempt to login with the fallback URL
                const fallbackResponse = await fetch(fallbackUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
    
                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    console.log("Fallback login successful:", fallbackData);
    
                    alert("User Login successful !!!! ");
                    navigate('/monthly-bill');
                    localStorage.setItem('userData', JSON.stringify(fallbackData));
                } else {
                    setError('Login failed. Please check your credentials or try again later.');
                }
    
            } catch (fallbackError) {
                console.error("Fallback URL failed:", fallbackError);
                setError('An error occurred. Please check your connection and try again.');
            }
        }
    };
    


    return (
        <div className="wrapper">
            <span className="rotate-bg"></span>
            <span className="rotate-bg2"></span>

            {isLogin ? (
                <LoginForm
                    toggleForm={toggleForm}
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                />
            ) : (
                <RegisterForm toggleForm={toggleForm} />
            )}
        </div>
    );
};

const LoginForm = ({ toggleForm, handleLogin, username, setUsername, password, setPassword, error }) => {
    return (
        <div className="form-box login">
            <h2 className="title animation">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-box animation">
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Username</label>
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box animation">
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="btn animation">Login</button>
                {error && <p className="error">{error}</p>}
                <div className="linkTxt animation">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="register-link">  Sign Up</Link>
                </div>
            </form>

            {/* <div className="info-text login">
                <h2 className="animation" */}

            {/* <div >
                <h2  style={{color:"gold"}}>Welcome Back!</h2>
                <p  style={{color:"gold" , marginLeft: }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nostrum harum expedita, magnam, nisi quisquam velit illum ipsum voluptatibus voluptates eligendi omnis! Numquam dolore expedita cupiditate iste, esse amet animi reprehenderit quidem, tempore molestiae sit corporis, nostrum perspiciatis facilis nemo eos et? Aperiam tempora nobis, aliquid veniam eos ullam architecto.</p>
            </div> */}
        </div>
    );
};

// If you want to keep the RegisterForm as a separate component:
const RegisterForm = ({ toggleForm }) => {
    return (
        <div>
            {/* You can keep it as it is or remove it since it will be handled in RegisterPage */}
        </div>
    );
};

export default AuthPage;
