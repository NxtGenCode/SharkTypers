const gameArea = document.querySelector("#game-area");
const gameText = document.querySelector("#game-text");

const userTextInput = document.querySelector("#user-text-input");
const countdownMessage = document.querySelector("#countdown-msg");
const timerText = document.querySelector("#timer");
const TEXT_PROMPTS =
[
    "He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himself and again tried to imagine it was the first time.",
    "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",
    "Sitting in the sun, away from everyone who had done him harm in the past, he quietly listened to those who roamed by. He felt at peace in the moment, hoping it would last, but knowing the reprieve would soon come to an end. He closed his eyes, the sun beating down on face and he smiled. He smiled for the first time in as long as he could remember.",
    "She counted. One. She could hear the steps coming closer. Two. Puffs of breath could be seen coming from his mouth. Three. He stopped beside her. Four. She pulled the trigger of the gun.",
    "The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.",
    "The leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it."
];

let wordToSpell = null;
let nextCharacterToType = null;
let correctCharacters = "";

function firstWordBeforeEmpty(str) {
    if (str == null) {
        return null;
    }

    const words = str.split(' ');

    return words[0];
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

let currentTextPrompt = randomTextPrompt();
let currentWordToType = firstWordBeforeEmpty(currentTextPrompt);
let currentWordCharIndex = 0;
let currentWordIndex = 0;

let currentCharacterToType = firstWordBeforeEmpty(currentWordToType[0]);

let characterToTypeSpan = document.createElement("span");
let characterNodeElement = document.createTextNode(currentTextPrompt);
characterToTypeSpan.appendChild(characterNodeElement);
gameText.append(characterToTypeSpan);

function onKeyDown(event) {
    let key = event.key;
    
    if (key === currentCharacterToType) {
        currentWordToType
        correctCharacters += key;
        currentWordCharIndex += 1;
        currentCharacterToType = firstWordBeforeEmpty(currentWordToType[currentWordCharIndex]);
        console.log("CurrentCharacterToType = "+currentCharacterToType);
        console.log("CorrectCharacters: "+correctCharacters);
    } else {
        if (key == " ") { // SPACE_BAR
            console.log("Space button hit.");
            if (currentWordToType == correctCharacters) {
                console.log("First word completed!");
                currentWordIndex += 1;
                // Reset 
                userTextInput.value = "";
                correctCharacters = "";
                currentWordCharIndex = 0;
                currentWordToType = searchWordBeforeEmpty(currentTextPrompt, currentWordIndex);
                currentCharacterToType = currentWordToType[0];
                console.log("Next Word To Type: "+currentWordToType);
                console.log("CurrentCharacterToType: "+currentCharacterToType);
                // update next word to type
                // rest index
                console.log(userTextInput.value);
                console.log("NEXT WORD: "+currentWordToType);
            }
            console.log("CorrectCharacters: "+correctCharacters);
        }
        console.log("Incorrect Key!");
    }
    console.log("Current word to type: "+currentWordToType);
}

userTextInput.addEventListener("keypress", onKeyDown);