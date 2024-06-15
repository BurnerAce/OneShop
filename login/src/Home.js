import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='homepage'>
            <div>
                <h1 style={{fontSize:"6rem", margin:"1rem"}}>Welcome to OneShop!</h1>
                <br></br>
                <p style={{textAlign:"center" , fontSize:"2rem"}}>Are you a customer or an owner?</p>
                <div style={{position:"relative", top:"-1.5rem"}}>
                    <Link to="/csignup">
                        <button style={{margin:"3rem" , borderRadius:"25px" }}>Customer Signup</button>
                    </Link>
                    <Link to="/osignup">
                        <button style={{ borderRadius: "25px" }}>Owner Signup</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
