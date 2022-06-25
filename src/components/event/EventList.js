import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "./EventManager.js"
import { useHistory } from 'react-router-dom';
import "../LevelUp.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])
    const handleMethod= (method,id) => {
        if (method === 'delete') {
          console.log("delete")
          deleteEvent(id)
          .then(() => getEvents().then(setEvents));
        }
        if (method === 'Leave') {
            console.log("Leave")
            leaveEvent(id)            
            .then(() => getEvents().then(setEvents));
          }
          if (method === 'Join') {
            console.log("Join")
            joinEvent(id)            
            .then(() => getEvents().then(setEvents));
          }
      };

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="card">
                        <div className="event__title">Event: {event.description} </div>
                        <div className="event_date">Date:{event.date} </div>
                        <div className="event_time">Time: {event.time}</div>
                        <div className="event_time">Game: {event.game.title}</div>
                        <div className="event_time">Organizer: {event.organizer.user.username}</div>
                        <Link to={`/editevent/${event.id}`} > Edit</Link>
                        <button type="button"  onClick={() => handleMethod('delete',event.id)} > Delete</button>
                        {
                            event.joined?
                            <button type="button"  onClick={() => handleMethod('Leave',event.id)} > Leave</button>
                            :
                            <button type="button"  onClick={() => handleMethod('Join',event.id)} > Join</button>

                        }
                        {/* <button type="button"  onClick={() => handleMethod('toggle',event.joined)} > {editMode ? "Join" : "Leave"}</button> */}
                        
                    </section>
                })
            }
        </article>
    )
}