import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from 'react-router-dom';
import "../LevelUp.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])
    const handleMethod= (method,id) => {
        if (method === 'delete') {
          console.log("delete")
          deleteGame(id)
          .then(() => getGames().then(setGames));
        }
      };

    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="card">
                {  
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="card">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <div className="game__skillLevel">gameType is {game.game_type.label}</div>
                            <Link to={`/editgame/${game.id}`} > Edit</Link>
                            <button type="button"  onClick={() => handleMethod('delete',game.id)} > Delete</button>
                        </section>
                    })
                }
            </article>
        </div>
    )
}