const playButton = document.getElementById('play');
const scoreScreen = document.getElementById('score');
const toGuessOutputArray = document.querySelectorAll('.number-to-guess');
const guessesForm = document.getElementById('guesses');
const guessInputsArray = document.querySelectorAll('.number-guessed');

const randomNumbersArray = [];
let timer;


playButton.addEventListener('click' , 
    function ()  {
        scoreScreen.innerHTML = `You have 30 seconds to memorize the ${toGuessOutputArray.length} numbers below`;

        for(let i = 0 ; i < toGuessOutputArray.length ; i++) {
            randomNumbersArray.push(randomNumberGenerator(0 , 99));
            toGuessOutputArray[i].innerHTML = randomNumbersArray[i];
            toGuessOutputArray[i].classList.toggle('visible');
        }

        setTimeout(function() {
            scoreScreen.innerHTML = 'Write the numbers that you have memorized on the blackboard';
            toGuessOutputArray.forEach((element) => element.classList.toggle('visible'));
            guessesForm.classList.toggle('disabled');
        }, 30000)

        guessesForm.addEventListener('submit' , 
            function (event)  {
                event.preventDefault();
        
                let score = 0;
        
                for(let i = 0 ; i < guessInputsArray.length ; i++) {
                    if(parseInt(guessInputsArray[i].value) === randomNumbersArray[i]) {
                        score++;
                    }
                }
        
                randomNumbersArray.splice(0,randomNumbersArray.length)
        
                scoreScreen.innerHTML = `You memorized ${score} out of ${toGuessOutputArray.length} numbers! If you want to play again press the play button!`;
                toGuessOutputArray.forEach((element) => element.classList.toggle('visible'));
                playButton.style.pointerEvents = 'none';
        
                setTimeout(function() {
                    toGuessOutputArray.forEach((element) => element.classList.toggle('visible'));
                    guessInputsArray.forEach((element) => element.value = '');
                    guessesForm.classList.toggle('disabled');
                    playButton.style.pointerEvents = 'auto';
                }, 5000)
            }
        );
    }
);

// Random number generator between max and min (included)
function randomNumberGenerator(min , max) {
    return Math.floor((Math.random()) * (max - min + 1)) + min;
}