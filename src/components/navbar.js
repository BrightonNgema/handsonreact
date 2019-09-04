import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <nav className="nav-wrapper red">
            <div className="container">
            
                <ul className="right">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>

        </nav>
        
    )
}

export default Navbar;