/**
 * 
 * Main Prototype Script for TyperRacers
 * 
 */
const hideMobileBtn = document.querySelector(".mobile-button");
const hideMobileDiv = document.querySelector(".hide-mobile");
let mobileNavOpen = false;

hideMobileBtn.addEventListener('click', () => {
    if (!mobileNavOpen) {
        hideMobileDiv.style.display = 'flex';
        mobileNavOpen = true;
        console.log('I ran to display the flex')
    } else {
        hideMobileDiv.style.display = 'none';
        mobileNavOpen = false;
        console.log('I ran to display none')
    }
})

const app = document.getElementById('app');
const gameText = document.getElementById('game-text');

const userInputBox = document.getElementById('user-input');
const clearInputBox = () => userInputBox.value = "";
clearInputBox();

let currentCharIndex;
let currentWordIndex;
let currentIncorrectWordIndex;

let completedWords, correctKeys, incorrectKeys, nextKey, keysLeft, textPrompt, textPromptNode;

let TEXT_PROMPTS = [
    "I like to eat ice cream.",
    "Don't take anything personally - nothing others do is because of you. What others say and do is a projection of their own reality, their own dream. When you are immune to the opinions and actions of others, you won't be the victim of needless suffering.",
    "That fear had been inside him for many years, it had lived with him, it had been another shadow ever since the night he awoke, shaken by a bad dream, and realized that death was not only a permanent probability, as he has always believed, but an immediate reality.",
    "It is not hard to make money in the market. What is hard to avoid is the alluring temptation to throw your money away on short, get-rich-quick speculative binges. It is an obvious lesson, but one frequently ignored."
]
let randomPromptIndex = () => Math.floor(Math.random() * TEXT_PROMPTS.length);
let selectedPrompt = TEXT_PROMPTS[randomPromptIndex()];

let currentWordObj = selectedPrompt.split(" ");

let completedWordCount = 0;
let lastCorrectKeyProgress = null;

const SHARK_INCREMENT_POS = 2;

const player = document.getElementById('player');
const playerShark = document.getElementById('player_shark');

const completedRaceUI = document.getElementById('completed-race-ui');

const fish1 = document.getElementById('fish_1');
const fish2 = document.getElementById('fish_2');
const fish3 = document.getElementById('fish_3');

let fishAte = 0;

function preloadElements() {
    completedWords = document.createElement('span');
    completedWords.setAttribute('class', 'completed-words');

    console.log("currentWordObj.length: "+currentWordObj.length);
    console.log("completedWords.innerText.length: "+completedWords.innerText.length);
    currentProgress = (completedWords.innerText.length / currentWordObj.length);
    console.log("currentProgress: "+currentProgress+"%");

    correctKeys = document.createElement('span');
    correctKeys.setAttribute('class', 'correct-keys');

    incorrectKeys = document.createElement('span');
    incorrectKeys.setAttribute('class', 'incorrect-keys');

    nextKey = document.createElement('span');
    nextKey.setAttribute('class', 'active-character');
    nextKey.innerHTML = nextCharToType();

    keysLeft = document.createElement('span');
    keysLeft.setAttribute('class', 'keys-left');
    keysLeft.innerHTML = keysLeftOfWord();

    textPrompt = document.createElement('span');
    textPrompt.setAttribute('class', 'text-prompt');
    textPromptNode = document.createTextNode(selectedPrompt);
    textPrompt.append(textPromptNode);
    textPrompt.innerHTML = updatedTextPrompt();

    console.log('keys left of word: ' + keysLeftOfWord())
    gameText.prepend(textPrompt);
    gameText.prepend(keysLeft);
    gameText.prepend(nextKey);
    gameText.prepend(incorrectKeys);
    gameText.prepend(correctKeys);
    gameText.prepend(completedWords);
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
    return textPrompt.innerText.slice(currentWordToType().length);
}

let sharkCounter = 0;
function handleInput(e) {
    const key = e.key;

    if (key == "CapsLock" || key == "Shift") {
        return;
    }

    //PLAYER HITS "SPACE OR ENTER TO SUBMIT"
    if (key == " " || key == "Enter") {
        //USER INPUT MATCHED WORD TO TYPE
        if (userInputBox.value == currentWordToType()) {
            e.preventDefault();
            correctKeys.innerHTML = "";
            completedWords.innerHTML += currentWordToType() + " ";
            completedWordCount += 1;
            currentCharIndex = 0;
            currentWordIndex++;
            currentIncorrectWordIndex++;
            lastCorrectKeyProgress = null;
            if (!currentWordToType()) {
                currentWordIndex--;
                currentIncorrectWordIndex--;
                completedRaceUI.style.display = 'block';
                userInputBox.setAttribute('disabled', true);
                return;
            }
            textPrompt.innerHTML = textPrompt.innerHTML.slice(currentWordToType().length + 1);
            nextKey.innerHTML = nextCharToType();
            keysLeft.innerHTML = keysLeftOfWord();
            console.log('next word..?: ' + currentWordToType())
            console.log('next char index..?: ' + currentCharIndex)
            clearInputBox();
            return;
        }
    }

    //Prevent user from typing so many keys
    if (key != "Backspace" && userInputBox.value.length == 16) {
        e.preventDefault();
        return;
    }
    //DELETEING KEYS START
    if (key == "Backspace") {
        //////INCORRECT KEYS FOUND

        //FIX BUG FOR - If you type any other key (besides Enter or Space) after a completed word it will return null.
        //TO-DO

        if (incorrectKeys.innerHTML.length >= 1) {
            console.log('currentword to type: ' + currentWordToType())
            console.log('previous to type: ' + previousWordToType())
            //if(currentIncorrectWordIndex >= 1 && currentCharIndex == 0 && ){

            if (incorrectKeys.innerHTML.length == 1) {
                if (correctKeys.innerHTML == previousWordToType()) {
                    incorrectKeys.innerHTML = "";
                    console.log('1 MILLION')
                    currentIncorrectWordIndex--;
                    currentCharIndex = currentWordToType().length;
                    textPrompt.innerHTML = " " + nextWordToType().concat('', textPrompt.innerHTML);
                    nextKey.innerHTML = "";
                    keysLeft.innerHTML = keysLeftOfWord();
                    return;
                } else {
                    incorrectKeys.innerHTML = incorrectKeys.innerHTML.slice(1)
                    console.log('ONLY 1 KEY WAS INCORRECT')
                }
            }
            if (incorrectKeys.innerHTML.length > 1) {
                console.log('BITCON 69 - incorrecykeys length:' + incorrectKeys.innerHTML.length);
                incorrectKeys.innerHTML = incorrectKeys.innerHTML.slice(0, incorrectKeys.innerHTML.length - 1)
                console.log('MORE THEN 1 KEY WAS INCORRECT')
                console.log(currentIncorrectWordIndex);
            }
            if (currentIncorrectWordIndex >= 1 && currentCharIndex == 0 && correctKeys.innerHTML != previousWordToType()) {
                console.log('there was a completed word met on index 0');
                currentIncorrectWordIndex--;
                console.log(currentIncorrectWordIndex)
                currentCharIndex = currentWordToType().length;
                incorrectKeys.innerHTML = incorrectKeys.innerHTML.slice(0, incorrectKeys.innerHTML.length - 1)
                textPrompt.innerHTML = " " + nextWordToType().concat('', textPrompt.innerHTML);
            }
            if (currentCharIndex <= 0) {
                currentCharIndex = 0;
            }
            currentCharIndex--;
            nextKey.innerHTML = nextCharToType();
            keysLeft.innerHTML = keysLeftOfWord();

            console.log('END OF INCORRECT KEY BACKSPACE');
            console.log(currentIncorrectWordIndex);
            console.log('NEXT WORD TO WORK ON: ' + currentWordToType());
            console.log('current incorrect word index: ' + currentIncorrectWordIndex);
            return;
        }
        //////NO MORE INCORRECT KEYS TO DELETE

        //////CORRECT KEYS FOUND        //BACKSPACE ON CORRECT 
        if (correctKeys.innerHTML.length >= 1) {
            if (lastCorrectKeyProgress == null) {
                lastCorrectKeyProgress = currentCharIndex;
            }
                                        // pizza
            if (lastCorrectKeyProgress < currentCharIndex) {
                lastCorrectKeyProgress = currentCharIndex;
                console.log("new high");
            }

            console.log("current char index: "+currentCharIndex);
            if (correctKeys.innerHTML.length == 1) {
                correctKeys.innerHTML = correctKeys.innerHTML.slice(1)
                console.log('chase')
            }
            if (correctKeys.innerHTML.length > 1) {
                correctKeys.innerHTML = correctKeys.innerHTML.slice(0, correctKeys.innerHTML.length - 1)
                console.log('michael')
            }
            console.log('backspace on correctkey')
            console.log(currentWordIndex);
            currentCharIndex--;
            if (currentCharIndex <= 0) {
                currentCharIndex = 0;
            }
            keysLeft.innerHTML = keysLeftOfWord();
            console.log('currentcharindex: ' + currentCharIndex);
            console.log(nextCharToType());
            console.log(keysLeftOfWord());
            nextKey.innerHTML = nextCharToType();
            console.log('INCORRECT KEY TYPED BITCOIN OVER 9000')
            console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);
        }
        //////NO MORE INCORRECT KEYS TO DELETE
        //DELETEING KEYS END
    }
    //> INCORRECT KEY INPUT <
    if (key != "Backspace" && key != nextCharToType() || key != "Backspace" && incorrectKeys.innerHTML.length >= 1) {
        if (key == "Enter") {
            userInputBox.value += " ";
        }

        if (nextCharToType() != undefined) {
            incorrectKeys.innerHTML += nextCharToType();
            currentCharIndex++;
        }

        //This fixes the bug where if a user typed a incorrect key on the last letter of the last word of prompt would give error. works for now.
        if (!nextCharToType() && nextWordToType() === undefined) {
            userInputBox.setAttribute('maxlength', `${currentWordToType().length}`);
            nextKey.innerHTML = "";
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
            textPrompt.innerHTML = textPrompt.innerHTML.slice(currentWordToType().length + 1);
            incorrectKeys.innerHTML += " ";
            nextKey.innerHTML = nextCharToType();
            keysLeft.innerHTML = keysLeftOfWord();
            console.log('NULL CHAR FOUND REST CHARINDEX TO 0')
            console.log('CurrentCharIndex:' + currentCharIndex);
            console.log('Current IncorrectWord Index:' + currentIncorrectWordIndex);
            console.log('Current CorrectWord Index:' + currentWordIndex);
            return;
        }

        keysLeft.innerHTML = keysLeftOfWord();
        nextKey.innerHTML = nextCharToType();
        console.log('INCORRECT KEY TYPED')
        console.log(nextCharToType())
        console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);

    }

    //> CORRECT KEY INPUT <
    if (key == nextCharToType() && incorrectKeys.innerHTML.length == 0) {
        correctKeys.innerHTML += nextCharToType();
        currentCharIndex++;
        keysLeft.innerHTML = keysLeftOfWord();
        
        if (lastCorrectKeyProgress < currentCharIndex) {
            //currentProgress = (completedWords.innerText.length / currentWordObj.length);
            sharkCounter += SHARK_INCREMENT_POS; // (100 - percentage )
            //console.log("Length of prompt: "+selectedPrompt.length);
            //console.log("completedWords + correctKeys length: "+(correctKeys.innerText.length + completedWords.innerText.length));

            let percentageCompleted = Math.fround((correctKeys.innerText.length + completedWords.innerText.length) / selectedPrompt.length).toFixed(2);
            console.log("Complete Percentage: "+percentageCompleted * 100+"%");

            playerShark.style.left = `${percentageCompleted * 100}` + "%";

            if(playerShark.style.left == "118px"){
                fish1.style.opacity = 0;
                fishAte++;
            }
            if(playerShark.style.left == "318px"){
                fish2.style.opacity = 0;
                fishAte++;
            }
            if(playerShark.style.left == "718px"){
                fish3.style.opacity = 0;
                fishAte++;
            }
        }
        
        if (!nextCharToType()) {
            nextKey.innerHTML = "";
            return;
        }

        nextKey.innerHTML = nextCharToType();
        console.log('CORRECT KEY TYPED')
        console.log(nextCharToType())
        console.log("Char Index: " + currentCharIndex + "| Word Index: " + currentWordIndex);

    }

    //TYPING KEYS END
}

function start() {
    currentCharIndex = 0;
    currentWordIndex = 0;
    currentIncorrectWordIndex = 0;
    preloadElements();
    userInputBox.addEventListener('keydown', handleInput);
    console.log('Game Started.')
    console.log('nextWord: ' + currentWordToType());
}

start();