import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUSer] = useContext(userContext);
    const {name,displayName}=loggedInUser;
    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <h5 style={{fontWeight: 'bold'}}>Take Ride</h5>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item px-3">
                            <Link className="link-style" to="/home">Home</Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="link-style" to="#destination">Destination</Link>
                        </li>
                        <li className="nav-item px-3">
                            <Link className="link-style" to="#Blog">Blog</Link>
                        </li>
                        <li className="nav-item px-3">
                            <a id="a-tag" href="https://facebook.com/rashadul5">Contact</a>
                        </li>
                        <li className="nav-item px-3">
                            {
                                name||displayName?<p>{name || displayName}</p>:<Link className="link-style" to="/login">Login</Link>
                            }
                        </li>
                        <li className="nav-item px-3">
                            {
                                (name||displayName) && <Link className="link-style" onClick={()=>setLoggedInUSer({})} to="/login">Log out</Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;