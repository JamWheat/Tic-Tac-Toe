## Tic-Tac-Toe

### The classic game, now on the world wide web!

#### Created as an exercise in DOM manipulation and user interaction

Players take turns marking a grid, the first to get three-in-a-row wins.

Current features:
- Players can take turns marking the grid.
- Once marked, a grid cell cannot be overwritten (and it will not pass the current player's turn)
- A restart button will clear the board and start a clean game. 
- The game will announce whose turn it is as the game progresses.
- If a player tries to make an already marked space the game will kindly remind them not to do that and let them try again.
- The game will check for when there is a clear winner or a draw and end the game, announcing who has won (if anyone).
- The reset button changes to read 'play again!' once a game has ended, no matter the outcome.


Planned future features:

- Allow players to input their names in place of 'X player' and 'O player.'
- The game will keep track of win count for each player.
- The game will let the loser for the previous game go first in the next game, randomly deciding who will get the first turn in the first game.
- Add a 'clear records' button, with a dialog window popping up to warn players they are about to reset the record.