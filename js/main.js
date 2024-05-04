/**
 * 
 * Main Prototype Script for TyperRacers
 * 
 */

const gameArea = document.querySelector("#game-area");
const gameText = document.querySelector("#game-text");

const userTextInput = document.querySelector("#user-text-input");
const countdownMessage = document.querySelector("#countdown-msg");
const timerText = document.querySelector("#timer");

const SPACE_BAR_KEY = " ";
const TEXT_PROMPTS =
    [
        "He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himself and again tried to imagine it was the first time.",
        "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
        "Sitting in the sun, away from everyone who had done him harm in the past, he quietly listened to those who roamed by. He felt at peace in the moment, hoping it would last, but knowing the reprieve would soon come to an end. He closed his eyes, the sun beating down on face and he smiled. He smiled for the first time in as long as he could remember.",
        "She counted. One. She could hear the steps coming closer. Two. Puffs of breath could be seen coming from his mouth. Three. He stopped beside her. Four. She pulled the trigger of the gun.",
        "The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.",
        "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it."
    ];

let currentTextPrompt = randomTextPrompt();
let totalWordsInPrompt = wordsLen(currentTextPrompt);
let currentWordToType = firstWordBeforeEmpty(currentTextPrompt);
let currentWordIndex = 0;
let totalWordsCompleted = 0;

let currentCharToTypeNext = currentWordToType[0];
let currentWordCharCount = 0;

let characterToTypeSpan = document.createElement("span");
let characterNodeElement = document.createTextNode(currentTextPrompt);

/**
 * SPAN ELEMENTS
 */
let typingCharsSpan = null;
let wordsToTypeSpan = null;
let promptLeftSpan = null;

function InitializeGameElements() {
    if (typingCharsSpan == null) {
        typingCharsSpan = document.createElement("span");
        typingCharsSpan.className = "testTypingCharsSpan";
        gameText.append(typingCharsSpan);

        let typingCharsTextNode = document.createTextNode(currentCharToTypeNext);
        typingCharsSpan.appendChild(typingCharsTextNode);
    }

    if (wordsToTypeSpan == null) {
        wordsToTypeSpan = document.createElement("span");
        wordsToTypeSpan.className = "testWordsToTypeSpan";
        
        let customString = currentWordToType.slice(1);
        let wordsToTypeTextNode = document.createTextNode(customString);
        wordsToTypeSpan.appendChild(wordsToTypeTextNode);
        gameText.append(wordsToTypeSpan);
        console.log("WORDS TO TYPE FIRST = "+wordsToTypeSpan.innerText);


    }

    if (promptLeftSpan == null) {
        promptLeftSpan = document.createElement("span")
        promptLeftSpan.className = "testPromptLeftSpan";

        let promptLeftString = currentTextPrompt.slice(currentWordToType.length, currentTextPrompt.length);
        let promptLeftTextNode = document.createTextNode(promptLeftString);
        promptLeftSpan.appendChild(promptLeftTextNode);

        gameText.append(promptLeftSpan);
    }
}

function UpdateGameElements() {

}

function onStart() {
    InitializeGameElements();
}

function firstWordBeforeEmpty(str) {
    if (str == null) {
        return null;
    }

    const words = str.split(' ');
    return words[0];
}

function wordsLen(str) {
    const array = str.trim().split(/\s+/);
    return array.length;
}

function searchWordBeforeEmpty(str, index) {
    if (str == null) {
        return null;
    }

    const words = str.split(' ');
    return words[index];
}

function randomTextPrompt() {
    let randomPrompt = null;
    let randomNumber = Math.floor((Math.random() * TEXT_PROMPTS.length));

    randomPrompt = TEXT_PROMPTS[randomNumber];
    return randomPrompt;
}

console.log("currentCharToTypeNext: " + currentCharToTypeNext);

let nextCharacterToTypeSpan = null;

function onKeyDown(event) {
    let key = event.key;

    console.log("key pressed: " + key);
    if (key == "Backspace" || key == "Delete") {
        if (currentWordCharCount == 0) {
            return;
        }
        currentWordCharCount -= 1;
        console.log("DEL BUTTON");

        typingCharsSpan.innerHTML = typingCharsSpan.innerHTML.substring(currentWordCharCount, typingCharsSpan.length - 1);
        if (currentWordCharCount <= 0) {
            currentWordCharCount = 0;
            console.log("currentWordCharCount = "+currentWordCharCount);
            if (nextCharacterToTypeSpan != null) {
                nextCharacterToTypeSpan.remove();
                nextCharacterToTypeSpan = null;
                console.log("remove span");
            }
        }
    }

    if (key == currentCharToTypeNext) {
        currentWordCharCount += 1;
        currentCharToTypeNext = currentWordToType[currentWordCharCount];

        //let typingCharsTextNode = document.createTextNode(currentCharToTypeNext);
        console.log("currentCharToTypeNext="+currentCharToTypeNext);
        if (currentWordCharCount > 1) {
            if (currentCharToTypeNext == undefined) {
                currentCharToTypeNext = " ";
            }
            if (currentWordToType[currentWordCharCount - 1] == undefined) {
                currentWordToType[currentWordCharCount - 1] = " ";
            }
            typingCharsSpan.innerHTML += currentWordToType[currentWordCharCount - 1];
            let newWordsToTypeString = wordsToTypeSpan.innerText.slice(1);
            console.log("newWordsToTypeString: "+newWordsToTypeString);
            wordsToTypeSpan.innerText = newWordsToTypeString
            console.log("WordsToTypeSpan.innerText="+wordsToTypeSpan.innerText);
            if (currentCharToTypeNext.innerText == undefined) {
                let spaceChar = " ";
                currentCharToTypeNext.innerText = spaceChar;
                
                console.log("ran space bar underfined!");
            }
            console.log("ran !"+wordsToTypeSpan.innerText);
        }

        if (currentWordCharCount == 1) {
            nextCharacterToTypeSpan = document.createElement("span");
            nextCharacterToTypeSpan.className = "nextCharacterToTypeSpan";
            gameText.append(nextCharacterToTypeSpan);

            let nextCharacterToTypeSpanTextNode = document.createTextNode(currentCharToTypeNext);
            nextCharacterToTypeSpan.appendChild(nextCharacterToTypeSpanTextNode);
        } else {

        }

        

        if (currentCharToTypeNext == undefined) {
            currentCharToTypeNext = " ";
        }
        console.log("currentCharToTypeNext: " + currentCharToTypeNext);
    }
    if (key == SPACE_BAR_KEY) {
        event.preventDefault();

        console.log("current word to type = " + currentWordToType == userTextInput.value)
        if (userTextInput.value == currentWordToType) { // Word Completion Condition
            totalWordsCompleted += 1;
            currentWordIndex += 1;
            userTextInput.value = "";
            currentWordToType = searchWordBeforeEmpty(currentTextPrompt, currentWordIndex);
            if (currentWordToType != null) {
                console.log("NEXT WORD: " + currentWordToType);
            }
            console.log("totalWordsCompleted: " + totalWordsCompleted);
        }

        if (totalWordsCompleted == totalWordsInPrompt) { // Prompt Completion Condition
            console.log("COMPLETED THE RACE!");
            totalWordsCompleted = 0;
            userTextInput.value = "YOU HAVE COMPLETED THE PROMPT!";
            return;
        }
    }
    console.log("Current word to type: " + currentWordToType);
}

/**
 * Event Listeners
 */
userTextInput.addEventListener("keydown", onKeyDown);
///////////////////////////////////////////////////////

/**
 * Initialize
 */
onStart();