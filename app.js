/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, dice2, priorRoll, stateGame;

//selecting an element via id and changing the text
//plus some type coercion
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//css to display: none
//document.getElementById('dice-1').style.display = 'none';
//document.getElementById('dice-2').style.display = 'none';
//faster than querySelector
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

initGame();

//Events
//can write function in the second parameter (called Anonymous function)
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(stateGame)
        {
            //1. random number
            dice = Math.floor(Math.random() * 6) + 1;
            dice2 = Math.floor(Math.random() * 6) + 1;

            //2. Display the result
            document.getElementById('dice-1').src = 'dice-' + dice + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
           
            


            //3. update the round score IF the rolled number was NOT a 1
            //!= performs type coercion
            if(dice !== 1 && dice2 !== 1){
                //Add score
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            else{
                nextPlayer();
            }
            /*if(dice !== 1){
                if(priorRoll !== 6)
                {
                    roundScore += dice;
                    priorRoll = dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
                else{
                        //prior roll was a 6
                        if(dice === 6)
                        {
                                roundScore = 0;
                                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                                activePlayer === 0 ? score[0] = 0 : scores[1] = 0;
                                
                                // update UI with the scores
                                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

                                priorRoll = 1;
                                nextPlayer();
                        }
                        else{
                            priorRoll = dice;
                            roundScore += dice;
                            document.querySelector('#current-' + activePlayer).textContent = roundScore;

                        }
                    }
                }
            else{
                //adjust current player score
                roundScore = 0;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                activePlayer === 0 ? scores[0] += roundScore : scores[1] += roundScore;

                //next player
                nextPlayer();

            }
            */
        }
        
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(stateGame){
        //add persons current score to global score
        scores[activePlayer] += roundScore;

        // update UI with the scores
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        var gameScore = document.querySelector('.final-score').value;
        var winningScore;
        
        //Undefined, 0, null or "" are COERCED to false
        //Anything else is true
        
        if(gameScore){
            winningScore = gameScore;
        }
        else{
            winningScore = 100;
        }
        
        //check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            stateGame = false;
        }
        else{
             //next player
            nextPlayer();
        } 
    }
    
});

document.querySelector('.btn-new').addEventListener('click', initGame);

function nextPlayer(){
    //check if player won game by going over 100
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function initGame(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    stateGame = true;
    priorRoll = 1;
    
    //css to display: none
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //faster than querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    

}