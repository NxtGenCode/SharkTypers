import "../index.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/register', formData);
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error(error.response.data); // Handle error response
        }
    };

    return (
        <>
            <Header />
            <div id="login-area">
                <h1>Register</h1>
                <div className="login-area-links"> <h2 style={{ paddingRight: '15px' }}>Register</h2> <Link to={`/login`}><h2>Login</h2></Link> </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register Account</button>
                </form>
            </div>
        </>
    )
}

export default Register