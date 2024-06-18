import Header from '../Header/Header'

import REEF from '../assets/imgs/reef.png'
import MEDAL from '../assets/imgs/medal.png'
import SHARK from '../assets/imgs/sharks/blue-shark.png'

import VICTORY_SOUND from '../assets/audio/game_victory_sound.wav'
import UNDER_WATER_SOUND from '../assets/audio/underwater_ambience.wav'
import TYPING_ERROR_SOUND from '../assets/audio/error_sound.wav'
import COLLECT_FISH_SOUND_1 from '../assets/audio/collect_fish_sound_1.wav'
import COLLECT_FISH_SOUND_2 from '../assets/audio/collect_fish_sound_2.wav'
import COLLECT_FISH_SOUND_3 from '../assets/audio/collect_fish_sound_3.wav'

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import useSound from 'use-sound';

function SharkTyperBox() {
    const [playVictorySound] = useSound(VICTORY_SOUND);
    const [playErrorSound] = useSound(TYPING_ERROR_SOUND, );

    const [playWaterSound] = useSound(UNDER_WATER_SOUND);
    const [play, { stop, isPlaying }] = useSound(soundUrl);
    

    playWaterSound();
    console.log(playWaterSound);

    const playerDisplayNameUI = useRef(null);
    const player = useRef(null);
    const playerShark = useRef(null);
    const typingAccuracyUI = useRef(null);
    const timeToCompleteUI = useRef(null);
    const wordsPerMinuteUI = useRef(null);
    const fishCollectedUI = useRef(null);
    const scoreUI = useRef(null);

    const completedRaceUI = useRef(null);
    const completedWords = useRef(null);
    const correctKeys = useRef(null);
    const nextKey = useRef(null);
    const keysLeft = useRef(null);
    const incorrectKeys = useRef(null);
    const textPrompt = useRef(null);
    const userInputBox = useRef(null);

    const SHARK_INCREMENT_POS = 2;

    let TEXT_PROMPTS = [
        "I like to eat ice cream.",
        "Don't take anything personally - nothing others do is because of you. What others say and do is a projection of their own reality, their own dream. When you are immune to the opinions and actions of others, you won't be the victim of needless suffering.",
        "That fear had been inside him for many years, it had lived with him, it had been another shadow ever since the night he awoke, shaken by a bad dream, and realized that death was not only a permanent probability, as he has always believed, but an immediate reality.",
        "It is not hard to make money in the market. What is hard to avoid is the alluring temptation to throw your money away on short, get-rich-quick speculative binges. It is an obvious lesson, but one frequently ignored."
    ]
    let randomPromptIndex = () => Math.floor(Math.random() * TEXT_PROMPTS.length);
    let selectedPrompt = TEXT_PROMPTS[randomPromptIndex()];

    let currentWordObj = selectedPrompt.split(" ");

    let currentCharIndex = 0;
    let currentWordIndex = 0;
    let currentIncorrectWordIndex = 0;

    let fish1Collected = false, fish2Collected = false, fish3Collected = false;
    let score = 0;
    let fishCollected = 0;

    let startTime = null;
    let raceTimer = null;

    let totalTimeToComplete = 0;
    let wordsPerMinute = 0;

    // To Calculate Accuracy
    let totalKeysPressed = 0;
    let correctKeysPressed = 0;
    let completedWordCount = null;
    let lastCorrectKeyProgress = null;

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    function formatTime(seconds) {
        // Calculate minutes and remaining seconds
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
    
        // Add leading zero if necessary
        var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var formattedSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;
    
        // Concatenate minutes and seconds with a colon
        var formattedTime = formattedMinutes + ":" + formattedSeconds;
    
        return formattedTime;
    }

    function currentWordToType() {
        if (currentIncorrectWordIndex >= 1) {
            return currentWordObj[currentIncorrectWordIndex];
        } else {
            return currentWordObj[currentWordIndex];
        }
    }

    function previousWordToType() {
        if (currentIncorrectWordIndex >= 1) {
            return currentWordObj[currentIncorrectWordIndex - 1];
        } else {
            return currentWordObj[currentWordIndex - 1];
        }
    }

    function nextWordToType() {
        if (currentIncorrectWordIndex >= 1) {
            return currentWordObj[currentIncorrectWordIndex + 1];
        } else {
            return currentWordObj[currentWordIndex + 1];
        }
    }

    function nextCharToType() {
        return currentWordToType().at(currentCharIndex);
    }

    function keysLeftOfWord() {
        return currentWordToType().slice(currentCharIndex + 1);
    }

    function updatedTextPrompt() {
        return selectedPrompt.slice(currentWordToType().length);
    }

    function handleInput(e) {

        const key = e.key;

        if (key == "CapsLock" || key == "Shift") {
            return;
        }

        //PLAYER HITS "SPACE OR ENTER TO SUBMIT"
        if (key == " " || key == "Enter") {
            //USER INPUT MATCHED WORD TO TYPE
            if (userInputBox.current.value == currentWordToType()) {

                e.preventDefault();
                correctKeys.current.innerHTML = "";
                completedWords.current.innerHTML += currentWordToType() + " ";
                completedWordCount += 1;
                currentCharIndex = 0;
                currentWordIndex++;
                currentIncorrectWordIndex++;
                lastCorrectKeyProgress = null;
                userInputBox.current.style.backgroundColor = "#FFFFFF";

                // WINNING CONDITION
                if (!currentWordToType()) {
                    currentWordIndex--;
                    currentIncorrectWordIndex--;
                    completedRaceUI.current.style.display = 'block';
                    userInputBox.current.setAttribute('disabled', true);

                    console.log("correctKeysPressed:"+correctKeysPressed);
                    console.log("totalKeysPressed:"+totalKeysPressed);
                    playVictorySound();
                    
                    let typingAccuracy = (correctKeysPressed / totalKeysPressed) * 100;
                    typingAccuracyUI.current.innerText = Math.floor(typingAccuracy)+'%';

                    score = typingAccuracy * 3;
                    scoreUI.current.innerText = Math.floor(score);

                    totalTimeToComplete = (performance.now() - startTime);
                    timeToCompleteUI.current.innerText = millisToMinutesAndSeconds(totalTimeToComplete);

                    //let timerFixedText = "Time: "+formatTime(Number(timeToCompleteUI.innerText));
                    //timerTextUI.current.InnerText = "";
                    //timerTextUI.current.InnerText = timerFixedText;
                    clearInterval(raceTimer);

                    totalTimeToComplete /= 1000;


                    let timeDiffInMinutes = totalTimeToComplete / 60;
                    let wordCount = currentWordObj.length;
                    let wpm = wordCount / timeDiffInMinutes;
                    wordsPerMinute = wpm;
                    wordsPerMinuteUI.current.innerText = Math.round(wordsPerMinute) + " WPM";

                    fishCollectedUI.current.innerText = fishCollected;
                    
                    startTime = null;
                    raceTimer = null;
                    totalTimeToComplete = 0;
                    wordsPerMinute = 0;
                    totalKeysPressed = 0;
                    correctKeysPressed = 0;
                    return;
                }

                textPrompt.current.innerHTML = textPrompt.current.innerHTML.slice(currentWordToType().length + 1);
                nextKey.current.innerHTML = nextCharToType();
                keysLeft.current.innerHTML = keysLeftOfWord();
                console.log('next word..?: ' + currentWordToType());
                console.log('next char index..?: ' + currentCharIndex);
                userInputBox.current.value = "";
                return;
            }
        }

        //Prevent user from typing so many keys
        if (key != "Backspace" && userInputBox.current.value.length == 16) {
            e.preventDefault();
            return;
        }

        //DELETEING KEYS START
        if (key == "Backspace") {
            //////INCORRECT KEYS FOUND

            if (incorrectKeys.current.innerHTML.length >= 1) {
                console.log('currentword to type: ' + currentWordToType())
                console.log('previous to type: ' + previousWordToType())

                if (incorrectKeys.current.innerHTML.length == 1) {
                    if (correctKeys.current.innerHTML == previousWordToType()) {
                        incorrectKeys.current.innerHTML = "";
                        userInputBox.current.style.backgroundColor = "#FFFFFF";
                        console.log('1 MILLION')
                        currentIncorrectWordIndex--;
                        currentCharIndex = currentWordToType().length;
                        textPrompt.current.innerHTML = " " + nextWordToType().concat('', textPrompt.current.innerHTML);
                        nextKey.current.innerHTML = "";
                        keysLeft.current.innerHTML = keysLeftOfWord();
                        return;
                    } else {
                        incorrectKeys.current.innerHTML = incorrectKeys.current.innerHTML.slice(1)
                        console.log('ONLY 1 KEY WAS INCORRECT')
                    }
                }
                if (incorrectKeys.current.innerHTML.length > 1) {
                    console.log('BITCON 69 - incorrecykeys length:' + incorrectKeys.current.innerHTML.length);
                    incorrectKeys.current.innerHTML = incorrectKeys.current.innerHTML.slice(0, incorrectKeys.current.innerHTML.length - 1)
                    console.log('MORE THEN 1 KEY WAS INCORRECT')
                    console.log(currentIncorrectWordIndex);
                }
                if (currentIncorrectWordIndex >= 1 && currentCharIndex == 0 && correctKeys.current.innerHTML != previousWordToType()) {
                    console.log('there was a completed word met on index 0');
                    currentIncorrectWordIndex--;
                    console.log(currentIncorrectWordIndex)
                    currentCharIndex = currentWordToType().length;
                    incorrectKeys.current.innerHTML = incorrectKeys.current.innerHTML.slice(0, incorrectKeys.current.innerHTML.length - 1)
                    textPrompt.current.innerHTML = " " + nextWordToType().concat('', textPrompt.current.innerHTML);
                }
                if (currentCharIndex <= 0) {
                    currentCharIndex = 0;
                }
                currentCharIndex--;
                nextKey.current.innerHTML = nextCharToType();
                keysLeft.current.innerHTML = keysLeftOfWord();

                console.log('END OF INCORRECT KEY BACKSPACE');
                console.log(currentIncorrectWordIndex);
                console.log('NEXT WORD TO WORK ON: ' + currentWordToType());
                console.log('current incorrect word index: ' + currentIncorrectWordIndex);
                console.log("incorrectKeys.innerText.length: " + incorrectKeys.current.innerHTML.length);

                if (incorrectKeys.current.innerHTML.length <= 0) {
                    userInputBox.current.style.backgroundColor = "#FFFFFF";
                }
                return;
            } else {
                userInputBox.current.style.backgroundColor = "#FFFFFF";
            }

            //////CORRECT KEYS FOUND WHILE DELETEING KEYS
            if (correctKeys.current.innerHTML.length >= 1) {
                if (lastCorrectKeyProgress == null) {
                    lastCorrectKeyProgress = currentCharIndex;
                }
                // pizza
                if (lastCorrectKeyProgress < currentCharIndex) {
                    lastCorrectKeyProgress = currentCharIndex;
                    console.log("new high");
                }

                console.log("current char index: " + currentCharIndex);
                if (correctKeys.current.innerHTML.length == 1) {
                    correctKeys.current.innerHTML = correctKeys.current.innerHTML.slice(1)
                    console.log('chase')
                }
                if (correctKeys.current.innerHTML.length > 1) {
                    correctKeys.current.innerHTML = correctKeys.current.innerHTML.slice(0, correctKeys.current.innerHTML.length - 1)
                    console.log('michael')
                }
                console.log('backspace on correctkey')
                console.log(currentWordIndex);
                currentCharIndex--;
                if (currentCharIndex <= 0) {
                    currentCharIndex = 0;
                }
                keysLeft.current.innerHTML = keysLeftOfWord();
                console.log('currentcharindex: ' + currentCharIndex);
                console.log(nextCharToType());
                console.log(keysLeftOfWord());
                nextKey.current.innerHTML = nextCharToType();
                console.log('INCORRECT KEY TYPED BITCOIN OVER 9000')
                console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);
            }
        }
        // DELETEING KEYS END //

        // INCORRECT KEY INPUT FOUND //
        if (key != "Backspace" && key != nextCharToType() || key != "Backspace" && incorrectKeys.current.innerHTML.length >= 1) {
            if (key == "Enter") {
                userInputBox.current.value += " ";
            }

            playErrorSound();

            if (nextCharToType() != undefined) {
                incorrectKeys.current.innerHTML += nextCharToType();
                currentCharIndex++;
            }

            //This fixes the bug where if a user typed a incorrect key on the last letter of the last word of prompt would give error. works for now.
            if (!nextCharToType() && nextWordToType() === undefined) {
                userInputBox.current.setAttribute('maxlength', `${currentWordToType().length}`);
                nextKey.current.innerHTML = "";
                return;
            }

            console.log('bitcoin 3031')
            console.log(currentWordIndex)
            console.log(currentIncorrectWordIndex)
            console.log(nextWordToType())
            console.log(currentCharIndex)

            if (!nextCharToType()) {
                currentCharIndex = 0;
                currentIncorrectWordIndex++;
                textPrompt.current.innerHTML = textPrompt.current.innerHTML.slice(currentWordToType().length + 1);
                incorrectKeys.current.innerHTML += " ";
                nextKey.current.innerHTML = nextCharToType();
                keysLeft.current.innerHTML = keysLeftOfWord();

                userInputBox.current.style.backgroundColor = "#ed5555";

                console.log('NULL CHAR FOUND REST CHARINDEX TO 0')
                console.log('CurrentCharIndex:' + currentCharIndex);
                console.log('Current IncorrectWord Index:' + currentIncorrectWordIndex);
                console.log('Current CorrectWord Index:' + currentWordIndex);
                return;
            }

            userInputBox.current.style.backgroundColor = "#ed5555";
            totalKeysPressed += 1;
            keysLeft.current.innerHTML = keysLeftOfWord();
            nextKey.current.innerHTML = nextCharToType();
            console.log('INCORRECT KEY TYPED')
            console.log(nextCharToType())
            console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);

        }

        // CORRECT KEY INPUT //
        if (key == nextCharToType() && incorrectKeys.current.innerHTML.length == 0) {
            correctKeys.current.innerHTML += nextCharToType();
            currentCharIndex++;
            keysLeft.current.innerHTML = keysLeftOfWord();
            correctKeysPressed += 1;
            totalKeysPressed += 1;

            if (lastCorrectKeyProgress < currentCharIndex) {
                let percentageCompleted = Math.fround((correctKeys.current.innerText.length + completedWords.current.innerText.length) / selectedPrompt.length).toFixed(2);
                console.log("Complete Percentage: "+percentageCompleted * 100+"%");
    
                playerDisplayNameUI.current.style.left = `${percentageCompleted * 100}` + "%";
                playerShark.current.style.left = `${percentageCompleted * 100}` + "%";
            }

            if (!nextCharToType()) {
                nextKey.current.innerHTML = "";
                return;
            }

            nextKey.current.innerHTML = nextCharToType();
            console.log('CORRECT KEY TYPED')
            console.log(nextCharToType())
            console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);

        }

    }

    return (
        <>
        <Header/>
        <div className="mainViewPort">
            <div id="type-racer-box">
                <div id="shark-area">
                    <div ref={player} className="player">
                        <div className="progress-line"></div>
                        <p ref={playerDisplayNameUI} id="player_display_name">ImpactHills</p>
                        <img ref={playerShark} id="player_shark" src={SHARK} width="64" height="64" alt="your shark" />
                        <img id="fish_1" src={REEF} width="64" height="64" alt="A fish" />
                        <img id="award" src={MEDAL} width="64" height="64" alt="A Medal For The Finish" />
                    </div>
                </div>
                <div id="game-text">
                    <span ref={completedWords} className="completed-words"></span>
                    <span ref={correctKeys} className="correct-keys"></span>
                    <span ref={incorrectKeys} className="incorrect-keys"></span>
                    <span ref={nextKey} className="next-key">{nextCharToType()}</span>
                    <span ref={keysLeft} className="keys-left">{keysLeftOfWord()}</span>
                    <span ref={textPrompt} className="text-prompt">{updatedTextPrompt()}</span>
                </div>
                <input ref={userInputBox} id="user-input" onKeyDown={(e) => handleInput(e)} type="text" placeholder="Enter Text Here" maxLength="16" />
                <div className="racer-buttons">
                    <Link to={`/`}><button id="mainMenu-btn" type="button">Main Menu (Leave Race)</button></Link>
                </div>
                <div id="completed-race-ui" ref={completedRaceUI}>
                    <h1>🏆 You Finished The Race! 🏆</h1>
                    <b>You Placed #1!</b>
                    <ul className="stats">
                        <li>Score: <span ref={scoreUI} id="score" style={{color: 'gold', paddingLeft: '5px'}}>3114</span></li>
                        <li>Accuracy:<span ref={typingAccuracyUI} id="typing_accuracy" style={{color: 'gold', paddingLeft: '5px'}}>98%</span></li>
                        <li>Time: <span ref={timeToCompleteUI} id="time_to_complete" style={{color: 'gold', paddingLeft: '5px'}}>2:15</span></li>
                        <li>Speed:<span ref={wordsPerMinuteUI} id="words_per_minute" style={{color: 'gold', paddingLeft: '5px'}}>98 WPM</span></li>
                        <li>Fish: <span ref={fishCollectedUI} id="fish_collected" style={{color: 'orange', paddingLeft: '5px'}}>99</span></li>
                    </ul>
                    <Link to={`/`}><button type="button">Main Menu</button></Link> <b>OR</b> <a href="/play"><button type="button" style={{background: 'green'}}>Play Again</button></a>
                </div>
            </div>
        </div>
        </>
    )
}

export default SharkTyperBox