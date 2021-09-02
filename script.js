'use strict';

// Selecting elements
const player0E1 = document.querySelector('.player--0');
const player0E2 = document.querySelector('.player--1');
const score0E1 = document.querySelector('#score--0');
const score1E2 = document.querySelector('#score--1');
const current0E0 = document.querySelector('#current--0');
const current0E1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0E1.textContent = 0;
score1E2.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


const swicthfun = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle('player--active');
    player0E2.classList.toggle('player--active');
}

// Rplling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. generating random dice number
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNum);

        //2. display dice
        diceEl.src = `dice-${diceNum}.png`;
        diceEl.classList.remove('hidden');


        // 3.check for rolled 1:  
        if (diceNum !== 1) {
            // Add dice to current score.
            currentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to next player.
            swicthfun();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1.Add current score to active player score
        scores[activePlayer] += currentScore;
        // scores[1]=scores[1];
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if players score is >=100.
        if (scores[activePlayer] >= 100) {
            // Finish the game.
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');

        } else {
            // swicth the next player.
            swicthfun();
        }
    }
});

btnNew.addEventListener('click', function() {
    location.reload();
});