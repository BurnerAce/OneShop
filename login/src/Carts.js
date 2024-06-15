import React, { useState, useEffect , useRef } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate=useNavigate();
    const [cart, setCart] = useState({});
    const storeRef = useRef(JSON.parse(localStorage.getItem('custstore')));
    let user = JSON.parse((localStorage.getItem('custuser')));
    const cartKey = `cart_${user.name}_${storeRef.current.shop}`;
    user = user ? user : "NA";
    useEffect(() => {
        if (user === "NA") {
            alert("You Must Login First!");
            navigate('/clogin');
        }
    }, [navigate, user]);

    
    useEffect(() => {
        // Retrieve the cart from local storage
        let localCart = localStorage.getItem(cartKey);
        setCart(localCart ? JSON.parse(localCart) : {});
    }, [cartKey]);

    const calculateTotal = () => {
        return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout =  async () => {
        const order = {
            user : user,
            cart : cart,
            owner : storeRef.current,
            status : 'pending'
        }
        console.log(order);
        await axios.post(`https://one-shop-backend-burnerace.vercel.app/orders?collect=${storeRef.current.collect}&name=${storeRef.current.shop}`, order);
        localStorage.removeItem(cartKey);
        alert('Proceeding to checkout...');
        navigate('/checkout');
        // Add your checkout logic here
    };

    if (user === "NA")
        return null;

    return (
        <div>
            <div style={{ display: 'flex', paddingLeft: "1rem", justifyContent: 'space-between' }}>
                <h1 style={{ margin: "8px"}}>Cart From {storeRef.current.shop}</h1>
                <div style={{ marginRight: "25px", fontSize: "1.5rem" }} className='storeLogout'>
                    <p>{user.name} <Link to="/logout">Logout</Link></p>
                </div>
            </div>
            <table style={{marginLeft:"20px"}}>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(cart).map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Rs. {item.price}</td>
                            <td>Rs. {item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{margin:"20px 20px 10px 20px", fontSize: "1.8rem"}}>Total Amount: Rs. {calculateTotal()}</p>
            <div style={{ margin: "20px 20px 10px 20px", justifyContent:"center"}}>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
