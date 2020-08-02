/*------Constants------*/



/*------Variables (state)------*/
// -1 = X, 1 = O
let player = null
let gameOver = false
let result = null
let cellFills = []
let double = null
let gameOn = false
let xVictories = null;
let oVictories = null;


/*------Cached Element References------*/
const readout = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const gridAll = document.getElementById("board");
const gridEach = document.getElementsByClassName("cell");
const xName = document.getElementById("xName");
const xWins = document.getElementById("xWins");
const oName = document.getElementById("oName");
const oWins = document.getElementById("oWins");
const nameInput = document.getElementById("nameInput");
const nameButton = document.getElementById("namer");
const resetScores = document.getElementById("resetScores");
const newPlayers = document.getElementById("newPlayers");

/*------Event Listeners------*/

restartBtn.addEventListener('click', function(){
    if (gameOn === true){
        init();
    }
});

gridAll.addEventListener('click', function(cell){
    if(gameOver === false){
        cellPress(cell);
    }
});

nameButton.addEventListener('click', function(){
    writeName();
})

resetScores.addEventListener('click', function(){
    if (gameOn === true){
        if (confirm("This will reset your scores to 0. Are you sure?") === true){
            xVictories = 0;
            oVictories = 0;
            resetScores.style.opacity = 0.6;
            init();
        }
    }
})

newPlayers.addEventListener('click', function(){
    if (confirm('This well resent the player names and set the scores back to 0. Are you sure?') === true){
        hardInit();
    }
})

/*------Functions------*/

// init();
hardInit();

function hardInit(){
    gameOver = true
    gameOn = false

    xVictories = 0
    oVictories = 0
    xWins.innerText = `Wins: ${xVictories}`
    oWins.innerText = `Wins: ${oVictories}`
    xName.innerText = 'waiting...'
    oName.innerText = 'waiting...'
    result = null
    double = false

    restartBtn.style.opacity = 0.6;
    resetScores.style.opacity = 0.6;
    cellFills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < cellFills.length; i++){
        gridEach[i].innerText = renderWhat(cellFills[i]);
    }
    readout.innerText = `Welcome! Let's get to know each other! X Player, what is your name?`;
    nameInput.style.display = "inline";
    nameButton.style.display = "inline";
}

function writeName(){
    if (xName.innerText === 'waiting...') {
        xName.innerText = nameInput.value;
        nameInput.value = ''
        readout.innerText = `Okay! and 0 Player, what shall we call you?`
    } else if (oName.innerText === 'waiting...'){
        oName.innerText = nameInput.value;
        nameInput.value = ''
        nameInput.style.display = "none";
        nameButton.style.display = "none";
        gameOn = true
        restartBtn.style.opacity = 1;
        init();
    }
}

function init(){
    // future feature: random first player?
    
    player = -1
    gameOver = false
    result = null
    double = false
    cellFills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    render();
}

function cellPress(cell){
    //can the index of am array be easily refrecned by an element?
    if (cell.target.innerText === ''){
        if (cell.target.id === "sq0"){
            cellFills.splice(0, 1, player)
        } else if (cell.target.id === "sq1"){
            cellFills.splice(1, 1, player)
        } else if (cell.target.id === "sq2"){
            cellFills.splice(2, 1, player)
        } else if (cell.target.id === "sq3"){
            cellFills.splice(3, 1, player)
        } else if (cell.target.id === "sq4"){
            cellFills.splice(4, 1, player)
        } else if (cell.target.id === "sq5"){
            cellFills.splice(5, 1, player)
        } else if (cell.target.id === "sq6"){
            cellFills.splice(6, 1, player)
        } else if (cell.target.id === "sq7"){
            cellFills.splice(7, 1, player)
        } else {
            cellFills.splice(8, 1, player)
        }
        passTurn();
    } else {
        double = true
    }
    endCheck();
}

function passTurn(){
    if (player === 1) {
        player = -1
    } else if (player === -1) {
        player = 1
    }
}



function endCheck(){
//  - called after each click to check for a winner
    // - first row = 0, 1, 2
    // - secpmd row = 3, 4, 5
            // - third row = 6, 7, 8
            // - first colomn = 0, 3, 6
            // - secpmd column = 1, 5, 7
            // - third column = 2, 5, 8
            // - first diagonal = 0, 4, 8
            // - second diagonal = 2, 4, 6
    if (checkTotal(cellFills[0],cellFills[1],cellFills[2]) === 3 ||
        checkTotal(cellFills[3],cellFills[4],cellFills[5]) === 3 ||
        checkTotal(cellFills[6],cellFills[7],cellFills[8]) === 3 ||
        checkTotal(cellFills[0],cellFills[3],cellFills[6]) === 3 ||
        checkTotal(cellFills[1],cellFills[4],cellFills[7]) === 3 ||
        checkTotal(cellFills[2],cellFills[5],cellFills[8]) === 3 ||
        checkTotal(cellFills[0],cellFills[4],cellFills[8]) === 3 ||
        checkTotal(cellFills[2],cellFills[4],cellFills[6]) === 3){
        gameOver = true;
        passTurn();
        result = player
        // render()
    } else if (cellFills.includes(0) === false){
        gameOver = true;
        result = 'draw';
        // render()
    }
    render();
}

function checkTotal(x,y,z){
    return Math.abs(x+y+z);
}

//In the end my render() is doing way more than it should be. The various if statements should be slipt off into their own fuctions and then render() can run through them. If I have time and energy I may tackle that.
function render(){
    if (gameOver === false) {
        if (double === false) {
            if (cellFills.includes(1) === false && cellFills.includes(-1) === false){
                readout.innerText = `Game on! ${(player === -1) ? `${xName.innerText}`: `${oName.innerText}`}, you're up first.`
            } else {
                readout.innerText = `${(player === -1) ? `${xName.innerText}`: `${oName.innerText}`}, it is your turn.`;
            }
        } else {
            readout.innerText = `Can't mark a box that's already been marked, this isn't the wild west.\nPick an empty box, ${(result === -1) ? `${xName.innerText}`: `${oName.innerText}`}`
            double = false;
        }
    } else {
        if (result === 'draw') {
            readout.innerText = `It's a draw!`
        } else {
            readout.innerText = `It's over, ${(result === -1) ? `${xName.innerText}`: `${oName.innerText}`} is the winner!`
            // (result === -1) ? xVictories += 1 : oVictories += 1;
            if (result === -1){
                xVictories += 1;
            } else {
                oVictories += 1;
            }
            resetScores.style.opacity = 1;
        }
    }
    for(let i = 0; i < cellFills.length; i++){
        gridEach[i].innerText = renderWhat(cellFills[i]);
    }
    xWins.innerText = `Wins: ${xVictories}`
    oWins.innerText = `Wins: ${oVictories}`
}

function renderWhat(i){
    if (i === 0){
        return ''
    } else if (i === -1){
        return 'X'
    } else {
        return 'O'
    }
}
