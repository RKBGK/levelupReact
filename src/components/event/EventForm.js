import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createEvent, getEventById, getGames, updateEvent } from "./EventManager"
const initialState = {
    description: "",
    eventDate: "",
    eventTime: "",
    eventGame: ""
}
export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState(initialState)
    const { id } = useParams()
    const editMode = id ? true : false

    useEffect(() => {
        if (editMode) {
            let isMounted = true;
            getEventById(id).then((res) => {
                if (isMounted) {
                    setCurrentEvent(
                        {
                           description: res.description,
                           eventDate: res.date,
                           eventTime: res.time,
                           eventGame: res.game.id
                        }
                    )
                    console.log(res)
                }
            })
            
        }
        getGames().then(setGames)
    },[])

    const changeEventState = (event) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[event.target.name] = event.target.value
        setCurrentEvent(newEvent)
        console.log(newEvent)
    }

    // const changeEventState = (e) => {
    //     const newEvent = Object.assign({}, currentEvent,) 
    //     let selectedVal = e.target.value
    //     newEvent[e.target.id] = selectedVal
    //     setCurrentEvent(newEvent)
    //     console.log(newEvent)
    //   }
    

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
                    <label htmlFor="eventGame">Game: </label>
                    <select name="eventGame" className="form-control"
                        value={currentEvent.eventGame}
                        onChange={changeEventState}
                        >

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
                        date: currentEvent.eventDate,
                        time: currentEvent.eventTime,
                        game: parseInt(currentEvent.eventGame)                      
                    }

                    {editMode ?                         
                        (updateEvent({...gameEvent,id})
                            .then(() => history.push("/events"))) :
                        (createEvent(gameEvent)
                            .then(() => history.push("/events")))

                    }

                    // Send POST request to your API
                    // createEvent(gameEvent)
                    //     .then(() => history.push("/events"))
                }}
                className="btn btn-primary">{editMode ? "Updates" : "Add a new event"}</button>

        </form>
    )
}
