import "../index.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function Login() {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    function handleForm(e) {
        e.preventDefault();
        
        console.log(userId + ' ' + password)

        axios.post('/api/login', {
            userId: userId,
            password: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return (
        <>
            <Header />
            <div id="login-area">
                <h1>Login In / Create An Account!</h1>
                <form onSubmit={handleForm}>
                    <label>Username:</label>
                    <input id="name" type="text" name="userId" onChange={ (e) => setUserId(e.target.value)} placeholder="Enter Username" />
                    <label>Password:</label>
                    <input id="password" type="password" name="password" onChange={ (e) => setPassword(e.target.value)} placeholder="Enter Password" />
                    <input type="submit" value="Sign In"/><br />
                    <input type="submit" value="Create An Account"/>
                    <Link to={`/`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>Home</Link>
                </form>
            </div>
        </>
    )
}

export default Login