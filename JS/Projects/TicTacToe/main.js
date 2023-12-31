// Selecting DOM elements
const cells = document.querySelectorAll(".cellIndex");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const restart = document.getElementById('restart');
const reset = document.getElementById('scorereset');
const turn = document.getElementById('status');
const x = document.getElementById('1');
const y = document.getElementById('2');

// Initializing scores
let sum1 = 0;
let sum2 = 0;

// Winning conditions for the TicTacToe game
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Array to store the state of each cell
let options = ["", "", "", "", "", "", "", "", ""];

// Initial player and game state
let currentPlayer = 'X';
let running = true;

// Event listener for cell clicks
function cellClicked() {
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const cellIndex = this.getAttribute('grid');
            console.log(cellIndex);

            options[cellIndex] = currentPlayer;
            console.log(options);

            if(!running){
                return;
            }

            cells[cellIndex].innerHTML = `${currentPlayer}`;
            checkWinner();
            switchPlayer();
            restartGame();   
        });
    });
}

// Switching player turns
function switchPlayer(){
    if(running){
        switch(currentPlayer){
            case 'X':
                currentPlayer = 'O';
                break;
            default :
                currentPlayer = 'X';
                break;
        }

        turn.innerHTML = `${currentPlayer}'s Turn`;
        console.log(currentPlayer);
    }
}

// Checking for a winner or a draw
function checkWinner() {
    for(let i = 0; i <= 7; i++){
        const condition = winCondition[i];
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];
        console.log(a);
        console.log(b);
        console.log(c);

        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            running = false;
            result.innerHTML = `${currentPlayer} Wins!!!`;
            scoreBoard(currentPlayer);
            break;
        }   
        if(!options.includes("")){
            running = false;
            result.innerHTML = "Draw!!!";
            break;
        }        
    }
}

// Restarting the game
function restartGame(){
    restart.addEventListener('click', function(){
        options = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = 'X';
        running = true;
        turn.innerHTML = `X's Turn`;
        result.innerHTML = ``;
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
    })
}

// Updating the scoreboard
function scoreBoard(score){
    if(score == 'X'){
        sum1++;
        x.innerHTML = sum1;
    }
    if(score == 'O'){
        sum2++;
        y.innerHTML  = sum2;
    }
}

// Resetting the scoreboard
function resetScore(){
    reset.addEventListener('click', function(){
        sum1 = 0;
        sum2 = 0;
        x.innerHTML = sum1;
        y.innerHTML = sum2;
    })
}

// Initializing the game and scoreboard
resetScore()
cellClicked();
