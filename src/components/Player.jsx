import { useState } from "react";

export default function Player({initialName, playerSymbol, isActive, onPlayerNameChange}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
        setIsEditing(editing => !editing);
        if (isEditing) {
            onPlayerNameChange(playerSymbol, playerName);
        }
    }
    function handleNameChange(event){
        setPlayerName(event.target.value);
    }

    let playerNameSpan = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        playerNameSpan = <input type="text" required value={playerName} onChange={handleNameChange}/>;

    }


    return (
        <li className={isActive ? "active": undefined}>
            <span className="player">
                {playerNameSpan}
                <span className="player-symbol">{playerSymbol}</span> 
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save":"Edit"}</button>
        </li>
          
    )
}