const remoteURL = "http://localhost:8000"

export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameById = (id) => {
    return fetch(`${remoteURL}/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}


export const createGame = (newgame) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newgame)
     })
        .then(getGames)
}

export const updateGame = (game) => {
    // const game = {
    //     id: id,
    //     maker: gameobj.maker,
    //     title: gameobj.title,
    //     number_of_players: gameobj.number_of_players,
    //     skill_level: gameobj.skill_level,
    //     game_type_id : gameobj.game_type_id                       
    // }
    console.log("updateGame",game)
    return fetch(`${remoteURL}/games/${game.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
     })
        .then(getGames)
}

export const deleteGame = (id) => {
    console.log("delete22")
    return fetch(`${remoteURL}/games/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        }
     })
        .then(getGames)
        
}