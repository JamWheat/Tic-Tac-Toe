/*------Constants------*/



/*------Variables (state)------*/
// -1 = X, 1 = O
let player = null
// winner - rather than boolean, four posibilities: none, X, O, or tie
let winner = null
// win states?
let cellFills = []


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
    if(winner === "none"){
        cellPress(cell);
    }
});

/*------Functions------*/

init();

function init(){
    // future feature: random first player?
    player = -1
    readout.innerText = "Let's play!";
    winner = "none";
    cellFills = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    render();
}

function cellPress(cell){
    //can the index of am array be easily refrecned by an element?
    console.log(cell.target.id);
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
        if (player === 1) {
             player = -1
        } else if (player === -1) {
             player = 1
        }
    }
    render();
    console.log(cell.target.innerText)
    console.log(cell.target.id)
    console.log(cellFills)
}



// Check winner function:
//  - called after each click to check for a winner
//  - check if the board is full
//      check the cellFills array for a 0
//  - runs through each of the win possibilities
//      - for each check, add up the total of the squares, if it adds up to 3 or -3 that means a player has won, set which player has won
//      - just looking at particular series on indexes in cellFills
//      - sets in question:
            // - first row = 0, 1, 2
            // - secpmd row = 3, 4, 5
            // - third row = 6, 7, 8
            // - first colomn = 0, 3, 6
            // - secpmd column = 1, 5, 7
            // - third column = 2, 5, 8
            // - first diagonal = 0, 4, 8
            // - second diagonal = 2, 4, 6
//  - if it runs though all 8 win possibilities and there were no winners and the board is full, declair a tie
//  - finally, pass to render


// Render function:
//  Future feature: a verity of readouts?
//  - if the game has ended, make the whole board unclickable
//  - forEach through the array of entries, printing what should fill each cell
function render(){
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
