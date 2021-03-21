import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './logInManager';
import Header from '../Header/Header';
import "./Login.css";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




function Login() {


    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) => {
        setUser(res);
        if (res.error === "") {
            setLoggedInUser(res);
            if (redirect) {
                history.replace(from);
            }
        }
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

const handleAccountType = () => {
    setNewUser(!newUser);
    const newUserInfo ={...user};
    newUserInfo.error="";
    setUser(newUserInfo);
    document.getElementById("myForm").reset();
}
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }


    return (
        <div className="bg-color">
            <Header></Header>
            <div className="d-flex justify-content-center">
                <div id="login-card" className="card" style={{ width: '20rem' }}>
                    {
                        newUser ?
                            <div>
                                <form  id="myForm" onSubmit={handleSubmit}>
                                    <h5 >Create an account</h5>
                                    <br />
                                    <input className="user-input" type="text" onBlur={handleBlur} name="name" placeholder="Name" required />
                                    <br />
                                    <input className="user-input" type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
                                    <br />
                                    <input className="user-input" id="password" type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
                                    <br />
                                    <button id="user-submit"  type="submit">Create an account</button>
                                </form>
                            </div>
                            : <div>
                                <form id="myForm" onSubmit={handleSubmit}>
                                    <h5 >Login</h5>
                                    <br />
                                    <input className="user-input" type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
                                    <br />
                                    <input className="user-input" type="password" onBlur={handleBlur} name="password" placeholder="Confirm Password" required />
                                    <br />
                                    <button id="user-submit"  type="submit">Login</button>
                                </form>
                            </div>
                    }
                    <br />
                    <p>{newUser ? "Already have an account?" : "Don't have an account?"} <span><input type="submit" onClick={handleAccountType} name="newUser" value={newUser ? "Login" : "Create an account"} id="login-manage-btn" /></span> </p>

                    <p style={{ color: 'red' }}>{user.error}</p>

                </div>
            </div>

            <div>
                <div className="text-center">
                    <button className="optional-login" type="button" onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} /> Continue With Google</button>
                </div>
            </div>
        </div>

    );
}

export default Login;