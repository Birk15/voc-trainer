import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LEARN_ROUTE, START_ROUTE, WRITE_ROUTE } from '../utils/const';

const Navbar = () => {
    const navigate = useNavigate();
        return (
            <nav className="navbar bg-primary" data-bs-theme="dark">
                <div className='btn_navbar'>
                    <button onClick={() => navigate(START_ROUTE)} type="button" className="btn btn-outline-light" style={{marginLeft: '30px'}}>Start</button>
                    <button onClick={() => navigate(LEARN_ROUTE)} type="button" className="btn btn-outline-light" style={{marginLeft: '30px'}}>Learn</button>
                    <button onClick={() => navigate(WRITE_ROUTE)} type="button" className="btn btn-outline-light" style={{marginLeft: '30px'}}>Write</button>
                </div>
            </nav>
        );
    }
 
export default Navbar;