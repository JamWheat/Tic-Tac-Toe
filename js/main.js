/*------Constants------*/



/*------Variables (state)------*/
// -1 = X, 1 = O
let player = null
let gameOver = false
let result = null
let cellFills = []
let double = null


/*------Cached Element References------*/
const readout = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const gridAll = document.getElementById("board");
const gridEach = document.querySelectorAll("div");
// const sq0 = document.getElementById("sq0").id = "0"
// references for each cell?


/*------Event Listeners------*/

// reset button
restartBtn.addEventListener('click', function(){
    init();
});
// onclick for each cell, within the bubble of section (will that click on section itself?)
gridAll.addEventListener('click', function(cell){
    if(gameOver === false){
        cellPress(cell);
    }
});

/*------Functions------*/

init();

function init(){
    // future feature: random first player?
    
    player = -1
    // readout.innerText = `${(player === -1) ? `X`: `O`} player, it is your turn.`;
    restartBtn.innerText = `Reset`
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
    console.log(checkTotal(cellFills[1],cellFills[5],cellFills[7]))
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

function render(){
    if (gameOver === false) {
        if (double === false) {
            readout.innerText = `${(player === -1) ? `X`: `O`} player, it is your turn.`
        } else {
            readout.innerText = `Can't mark a box that's already been marked, this isn't the wild west.\nTry again, ${(player === -1) ? `X`: `O`} player`
            double = false;
        }
    } else {
        if (result === 'draw') {
            readout.innerText = `It's a draw!`
        } else {
            readout.innerText = `It's over, ${(result === -1) ? `X`: `O`} player is the winner!`
        }
        restartBtn.innerText = `Play again!`
    }
    for(let i = 0; i < cellFills.length; i++){
        gridEach[i].innerText = renderWhat(cellFills[i]);
    }
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
