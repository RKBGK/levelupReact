import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent, getGames } from "./EventManager"

export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        eventDate: "",
        eventTime: "",
        game: ""
    })

    useEffect(() => {
        getGames().then(setGames)
    },[])

    const changeEventState = (event) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[event.target.name] = event.target.Value
        setCurrentEvent(newEvent)
    }

    return(
        <form className="eventForm">
        <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Title: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventDate">Date: </label>
                    <input type="date" name="eventDate" required autoFocus className="form-control"
                        value={currentEvent.eventDate}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTime">Time: </label>
                    <input type="time" name="eventTime" required autoFocus className="form-control"
                        value={currentEvent.eventTime}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game Type: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>

                        <option value="0">Select a game </option>
                        {
                            games.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const gameEvent = {
                        description: currentEvent.description,
                        eventDate: currentEvent.eventDate,
                        eventTime: parseInt(currentEvent.eventTime),
                        game: parseInt(game)                      
                    }

                    // Send POST request to your API
                    createEvent(gameEvent)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>

        </form>
    )
}
