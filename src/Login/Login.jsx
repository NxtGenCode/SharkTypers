import "../index.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Login(){
    return(
        <>
        <Header/>
        <div id="login-area">
            <h1>Login In / Create An Account!</h1>
            <form>
                <input type="text" placeholder="Enter Username"/>
                <input type="password" placeholder="Enter Password"/>
                <input type="submit" value={"Sign In"}/><br/><input type="submit" value={"Create An Account"}/>
                <Link to={`/`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>Home</Link>
            </form>
        </div>
        </>
    )
}

export default Login