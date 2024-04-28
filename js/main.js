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

function randomTextPrompt() {
    let randomPrompt = null;
    let randomNumber = Math.floor((Math.random() * TEXT_PROMPTS.length));

    randomPrompt = TEXT_PROMPTS[randomNumber];
    return randomPrompt;
}

let currentTextPrompt = randomTextPrompt();
let currentWordToType = firstWordBeforeEmpty(currentTextPrompt);
let currentWordCharIndex = 0;
let currentCharacterToType = firstWordBeforeEmpty(currentWordToType[currentWordCharIndex]);
console.log("CurrentCharacterToType = "+currentCharacterToType);

function onKeyDown(event) {
    let key = event.key;
    
    if (key === currentCharacterToType) {
        correctCharacters += key;
        currentWordCharIndex += 1;
        currentCharacterToType = firstWordBeforeEmpty(currentWordToType[currentWordCharIndex]);
        console.log("CurrentCharacterToType = "+currentCharacterToType);
        
        console.log("correctCharacters: "+correctCharacters);
        console.log("success!");
    } else {
        if (key == " ") {
            if (currentWordToType == correctCharacters) {
                console.log("first word done!");
                // Reset 
                userTextInput.innerHTML = "";
            }
            console.log("Space button");
        }
        console.log("failure!");
        console.log(currentCharacterToType);
    }
    console.log("key pressed: "+key);
    console.log("current word to type: "+currentWordToType);
}

gameText.innerHTML = currentTextPrompt;
userTextInput.addEventListener("keypress", onKeyDown);