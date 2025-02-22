import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";


const INITIAL_GAME_BOARD = new Array(3).fill(null).map(() => new Array(3).fill(null));

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

function deriveActivePlayer(turns){
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
    let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        gameBoard[square.row][square.col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players){
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      const first = gameBoard[a.row][a.column];
      const second = gameBoard[b.row][b.column];
      const third = gameBoard[c.row][c.column];
      if (first && first == second && first == third) {
        winner = players[first];
        break;
      }
    }

    return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] =  useState([]);


  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(turns => {
      let currentPlayer = deriveActivePlayer(turns);

      const updateTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...turns
      ];
      return updateTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName){
    setPlayers(players =>{
      return {
        ...players,
        [playerSymbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName={PLAYERS.X}  playerSymbol="X" isActive={activePlayer == "X"} onPlayerNameChange={handlePlayerNameChange}/>
            <Player initialName={PLAYERS.O}  playerSymbol="O" isActive={activePlayer == "O"} onPlayerNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
