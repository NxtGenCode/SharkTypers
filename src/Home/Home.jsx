import React, {useState} from "react";
import { Link } from "react-router-dom";


function Home(){

    const [src, setSrc] = useState('./sharks/default-shark.png');

    function changeColor(e) {
        setSrc('./sharks/' + `${e.target.id}` + '-shark.png');
    }

    return(
        <main>
            <section id="home">
                <div className="welcome-block">
                    <div className="shark-preview-area">
                        <div className="shark-preview">
                        <img id="shark-preview" src={src} width="250" height="250" alt="Shark Preview"/>
                        </div>
                        <div className="shark-color-previews">
                            <div className="f-column">
                                <div id="red" onClick={ (e) => changeColor(e) } style={{background: 'red' }} className="color-block"></div>
                                <div id="yellow" onClick={ (e) => changeColor(e) } style={{background: 'yellow' }} className="color-block"></div>
                                <div id="green" onClick={ (e) => changeColor(e) } style={{background: 'green' }} className="color-block"></div>
                                <div id="blue" onClick={ (e) => changeColor(e) } style={{background: 'blue' }} className="color-block"></div>
                            </div>
                            <div className="f-column">
                                <div id="white" onClick={ (e) => changeColor(e) } style={{background: 'white' }} className="color-block"></div>
                                <div id="default" onClick={ (e) => changeColor(e) } style={{background: 'grey' }} className="color-block"></div>
                                <div id="black" onClick={ (e) => changeColor(e) } style={{background: 'black' }} className="color-block"></div>
                                <div id="pink" onClick={ (e) => changeColor(e) } style={{background: 'pink' }} className="color-block"></div>
                            </div>
                        </div>
                    </div>
                    <div className="welcome-buttons">
                        <Link to={`/play`}><button id="play" type="button">PLAY NOW!</button></Link>
                        <Link to={`/login`}><button id="create" type="button">Login/Create An Account</button></Link>
                    </div>
                </div>
            </section>
            <section id="game-modes">
                <div style={{background: 'green'}} id="school-mode" className="small-block">
                    <h3>School Mode</h3>
                    <p>Select grades from Pre-School all the way to college!</p>
                </div>
                <div style={{background: 'red'}} id="hardcore-mode" className="small-block">
                    <h3>Hardcore Mode</h3>
                    <p>In hardcore mode, make ONE mistake and it's all over!</p>
                </div>
                <div style={{background: 'white', color:'black'}} id="picture-mode" className="small-block">
                    <h3>Picture to Word Mode</h3>
                    <p>Test yourself by typing the correct word for each picture!</p>
                </div>
            </section>
            <section id="highscores">
                <h1 className="title-header">SharkTypers HighScores!</h1>
            </section>
            </main>
    )
}

export default Home