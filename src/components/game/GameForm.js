import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameById, getGameTypes, updateGame } from './GameManager.js'

const initialState = {
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0}

export const GameForm = () => {
    // const [formGame, setFormGame] = useState(initialState);
    const [currentGame, setCurrentGame] = useState(initialState)
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { id } = useParams()
    const editMode = id ? true : false
      /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

//  gamerId: localStorage.getItem("lu_token")
    useEffect(() => {
        if (editMode) {      
            let isMounted = true;
            getGameById(id).then((res) => {
              if (isMounted)  {
                setCurrentGame(
                    {
                        skillLevel: res.skill_level,
                        numberOfPlayers: res.number_of_players,
                        title: res.title,
                        maker: res.maker,
                        gameTypeId: res.game_type.id
                    }
                )

                console.log(res)
              }
            })
        }
         getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
        // TODO: Complete the onChange function
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>

                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)                       
                    }

                    // Send POST request to your API
                    {editMode ?                         
                        (updateGame({...game,id})
                            .then(() => history.push("/games"))) :
                        (createGame(game)
                            .then(() => history.push("/games")))

                    }
                }}
                className="btn btn-primary">{editMode ? "Save Updates" : "Add a new game"}</button>
        </form>
    )
}