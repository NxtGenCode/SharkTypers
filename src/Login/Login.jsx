import "../index.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', formData);
            console.log(response.data); // Handle success response
        } catch (error) {
            console.error(error.response.data); // Handle error response
        }
    };

    return (
        <>
            <Header />
            <div id="login-area">
                <h1>Login</h1>
                <div className="login-area-links"> <h2 style={{ paddingRight: '15px' }}>Login</h2> <Link to={`/register`}><h2>Register</h2></Link> </div>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login