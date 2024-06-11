import Logo from '../assets/imgs/logo.png'
import DefaultAvatar from '../assets/imgs/default-avatar.png'
import MobileNavIcon from '../assets/imgs/nav-menu.png'

import { Link } from "react-router-dom";

function Header(){

    return(
        <header>
                <div className="header-left">
                <div id="logo">
                    <Link to={`/`}>
                        <img src={Logo} width="320" height="100%" alt="Shark Typers"/>
                    </Link>
                </div>
                <div className="nav">
                    <ul>
                        <li className="mobile-button"><img src={MobileNavIcon} width="48" height="48" alt="Mobile Navigation"/></li>
                        <div className="hide-mobile">
                        <li><Link to={`/`}>Home</Link></li>
                        <li><Link to={`/play`}>Play Now</Link></li>
                        <li><a href="#">Updates</a></li>
                        <li><a href="#">HighScores</a></li>
                        <li><Link to={`/login`}>Login/Register</Link></li>
                        </div>
                    </ul>
                </div>
                </div>
                <div className="header-right">
                    <div className="user-nav-ui">
                    <Link to={`/login`}>
                    <div className="user-avatar">
                            <img id="avatar" src={DefaultAvatar} width="32" height="32" alt="Your Avatar" title="View Profile"/>
                    </div>
                    </Link>
                        <h2>Welcome Guest! Sign In to experience the full shark typer fun!</h2>
                    </div>
                </div>
            </header>
    )
}

export default Header