'use strict';

function Dice() {

    this.gamePlaying = false;
    this.activePlayer = 0;
    this.scores = [];
    this.currentAmount = 0;
    this.total = [0, 0];

    // Dom elements
    this.nextBtn = document.querySelector('#js-btn__roll');
    this.holdBtn = document.querySelector('#js-btn__hold');
    this.newBtn = document.querySelector('#js-btn__new');

    // NEW GAME FUNCTION
    this.newGame = function(){
        if (!this.gamePlaying) {
            
            for (var i = 0; i <= 1; i++) {
                document.querySelector('#js-scores-' + i).textContent = '0';
                document.querySelector('#js-name-' + this.activePlayer).innerText = 'Player ' + (this.activePlayer + 1);
                document.querySelector('#js-total-' + i).textContent = '0';

                this.currentAmount = 0;
                this.total = [0, 0];
            }

            this.gamePlaying = true;
            this.newBtn.classList.toggle('rotation');
        }
    };

    // HOLD SCORES FUNCTION
    this.holdScores = function () {
        if (this.gamePlaying) {
            // Add current values to total Scores
            this.total[this.activePlayer] += this.currentAmount;

            // Get input value
            var input = document.querySelector('#js-input').value;
            var inputValue;

            inputValue = input ? inputValue = input : inputValue = 100;

            if (this.total[this.activePlayer] >= inputValue) {
                this.winner();
            } else {
                document.querySelector('#js-total-' + this.activePlayer).textContent = this.total[this.activePlayer];

                // Call Next Player function
                this.nextPlayer();
            }
        }
    };

    // NEXT ROLL FUNCTION
    this.nextRoll = function () {

        if (this.gamePlaying) {
            console.log(this.activePlayer);
            document.querySelector('#js-player-' + this.activePlayer).classList.add('active');

            // Roll Button Animation
            document.querySelector('#js-btn__roll').classList.toggle('roll');

            var scores = [];
            var diceVal;

            // Pass Dices value to scores array 
            for (var i = 0; i <= 1; i++) {
                diceVal = this.calcDice();

                // Writing pictures src
                document.querySelector('#js-dice-' + (i + 1)).src = 'img/dice-' + diceVal + '.png';
                scores.push(diceVal);
            }

            // Dices values amount
            var dicesAmount = scores[0] + scores[1];
            this.currentAmount += dicesAmount;

            // If value one of the dices or both is 1 or amount of dices values equals 12, call nextPlayer
            if (scores[0] == 1 || scores[1] == 1) {
                this.nextPlayer();
                console.log(1);
            } else if (dicesAmount == 12) {
                document.querySelector('#js-scores-' + this.activePlayer).textContent = this.currentAmount;
                this.holdScores();
                // this.nextPlayer();
                console.log(12);
            } else {
                // Writing value to Current players scores
                document.querySelector('#js-scores-' + this.activePlayer).textContent = this.currentAmount;
            }
        }
    };

    // NEXT PLAYER FUNCTION
    this.nextPlayer = function () {
        // Add active class to player
        document.querySelector('#js-player-' + this.activePlayer).classList.remove('active');

        // Reset currentAmount and current counter
        this.currentAmount = 0;
        document.querySelector('#js-scores-' + this.activePlayer).textContent = 0;

        // Pass value of activePlayer
        this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;

        if (this.activePlayer) {
            document.querySelector('.dice__cover').style.left = '50%';
        } else {
            document.querySelector('.dice__cover').style.left = '0%';
        }

        // AddActive class to players panel
        document.querySelector('#js-player-' + this.activePlayer).classList.add('active');
    };

    // WINNER FUNCTION
    this.winner = function(){
        document.querySelector('#js-total-' + this.activePlayer).textContent = this.total[this.activePlayer];
        document.querySelector('#js-name-' + this.activePlayer).textContent = 'WINNER!';
        document.querySelector('#js-scores-' + this.activePlayer).textContent = '0';
        this.newBtn.classList.remove('rotation');
        this.gamePlaying = false;
    };

    // CALCULATE RANDOM VALUE
    this.calcDice = function () {
        var diceVal = Math.floor((Math.random() * 6) + 1);
        return diceVal;
    };
};

var dice = new Dice();

dice.nextBtn.addEventListener('click', dice.nextRoll.bind(dice));
dice.holdBtn.addEventListener('click', dice.holdScores.bind(dice));
dice.newBtn.addEventListener('click', dice.newGame.bind(dice));










