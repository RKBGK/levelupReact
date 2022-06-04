import React, { useState, useEffect } from 'react';
import { getGames } from "./GameManager.js"
import { useHistory } from 'react-router-dom';
import "../LevelUp.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

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
                        </section>
                    })
                }
            </article>
        </div>
    )
}